$( document ).ready(function() {

  $.ajax({
    type: "GET",
    url: "/donations_ceap_tse",
    success: function(data){
      var s = new sigma('container-graph');
      var label = undefined
      var color = undefined

      data["result"].forEach(function(item) {
        if (item["@class"] == "Transacao") {
          color = '#f00'
          label = item['TxtDescricao'] + " - R$ " + item["VlrReceita"]
        } else if(item["@class"] == "Parlamentar") {
          color = '#00f'
          label = item['TxNomeParlamentar']
        } else {
          color = '#ec5148'
          label = item['TxtFornecedor']
        }

        s.graph.addNode({
          id: item["@rid"],
          label: label,
          x: Math.random(),
          y: Math.random(),
          size: 1,
          color: color
        })
      })

      var transactions = data["result"].filter(function(item) { return item["@class"] == "Transacao" })
      var deputies = data["result"].filter(function(item) { return item["@class"] == "Parlamentar" })
      var companies = data["result"].filter(function(item) { return item["@class"] == "EmpresaFornecedora" })

      transactions.forEach(function(item) {
        var supplier = undefined
        var deputy = undefined
        var company = undefined

        deputy = deputies.filter(function(deputy_item) {
          return deputy_item["out_RealizaTransacao"].includes(item["in_RealizaTransacao"][0])
        })

        company = companies.filter(function(company_item) {
          return company_item["out_RealizaTransacao"].includes(item["in_RealizaTransacao"][0])
        })

        if (deputy.length != 0) {
          s.graph.addEdge({
            id: deputy[0]["@rid"] + item["@rid"],
            source: deputy[0]["@rid"],
            target: item["@rid"]
          });
        } else {
          s.graph.addEdge({
            id: company[0]["@rid"] + item["@rid"],
            source: company[0]["@rid"],
            target: item["@rid"]
          });
        }

        if (item["out_FornecidaPor"] != undefined) {
          company = companies.filter(function(company_item) {
            return company_item["in_FornecidaPor"].includes(item["out_FornecidaPor"][0])
          })

          if (company.length != 0) {
            s.graph.addEdge({
              id: company[0]["@rid"] + item["@rid"],
              source: item["@rid"],
              target: company[0]["@rid"]
            });
          }
        } else {
          deputy = deputies.filter(function(deputy_item) {
            return deputy_item["in_FornecidaPara"].includes(item["out_FornecidaPara"][0])
          })

          if (deputy.length != 0) {
            s.graph.addEdge({
              id: deputy[0]["@rid"] + item["@rid"],
              source: item["@rid"],
              target: deputy[0]["@rid"]
            });
          }
        }
      })
      s.graph.nodes().forEach(function(node, i, a) {
        node.x = Math.cos(Math.PI * 2 * i / a.length);
        node.y = Math.sin(Math.PI * 2 * i / a.length);
      });
      s.refresh();
      s.startForceAtlas2({worker: true, adjustSizes:true, scalingRatio: 1});
    }
  });


  $.ajax({
    type: "GET",
    url: "/deputy_by_group",
    success: function(data){
      Highcharts.chart('container-deputy-group', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Distribuição de deputados por partido'
      },
      subtitle: {
          text: 'Deputados que utilizaram a CEAP'
      },
      xAxis: {
          categories: data["result"].map(function(item) {return item["SgPartido"]}),
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Quantidade de deputados'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Quantidade',
          data: data["result"].map(function(item) {return item["count"]})

      }]
    });
    }
  });

  $.ajax({
    type: "GET",
    url: "/deputy_by_number_of_transactions",
    success: function(data){
      Highcharts.chart('container-deputy-transaction', {
         chart: {
             plotBackgroundColor: null,
             plotBorderWidth: null,
             plotShadow: false,
             type: 'pie'
         },
         title: {
             text: '10 deputados que mais utilizaram a CEAP em 2017'
         },
         plotOptions: {
             pie: {
                 allowPointSelect: true,
                 cursor: 'pointer',
                 dataLabels: {
                     enabled: true,
                     format: '<b>{point.name}</b>: {point.percentage:.1f}',
                     style: {
                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                     },
                     connectorColor: 'silver'
                 },
                 showInLegend: true,
             }
         },
         series: [{
             name: 'Transações',
             data: data["result"].map(function(item) { return {name: item["TxNomeParlamentar"] + " - " + item["SgPartido"], y: item["transacoes"]} })
         }]
      });
    }
  });

  $.ajax({
  type: "GET",
  url: "/enterprise_by_number_of_transactions",
  success: function(data){
    Highcharts.chart('container-enterprise-transaction', {
        chart: {
            type: 'bar'
        },
        title: {
            text: '15 maiores empresas fornecedoras'
        },
        subtitle: {
            text: 'Empresas que mais forneceram serviços a deputados'
        },
        xAxis: {
            categories: [],
            title: {
                text: null
            },
            labels: {
              enabled:false
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Serviços prestados',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        credits: {
            enabled: false
        },
        series: data["result"].map(function(item) { return {name: item["TxtFornecedor"], data: [item["servicos"]]} })
    });
  }
  });
});
