$( document ).ready(function() {
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
      // Radialize the colors
      Highcharts.setOptions({
         colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
             return {
                 radialGradient: {
                     cx: 0.5,
                     cy: 0.3,
                     r: 0.7
                 },
                 stops: [
                     [0, color],
                     [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                 ]
             };
         })
      });

      // Build the chart
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
});
