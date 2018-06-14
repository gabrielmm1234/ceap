$( document ).ready(function() {

    // Let's first initialize sigma:
    var s = new sigma('container-graph');

    // Then, let's add some data to display:
    s.graph.addNode({
      // Main attributes:
      id: 'n0',
      label: 'Hello',
      // Display attributes:
      x: 0,
      y: 0,
      size: 1,
      color: '#f00'
    }).addNode({
      // Main attributes:
      id: 'n1',
      label: 'World !',
      // Display attributes:
      x: 0,
      y: 1,
      size: 1,
      color: '#00f'
    }).addEdge({
      id: 'e0',
      // Reference extremities:
      source: 'n0',
      target: 'n1'
    });

    // Finally, let's ask our sigma instance to refresh:
    s.refresh();

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
