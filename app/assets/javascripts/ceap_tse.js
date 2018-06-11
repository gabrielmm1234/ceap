$( document ).ready(function() {
  $.get("/deputy_by_group", function(data, status){
    console.log(data)
    Highcharts.chart('container', {
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
  });
});
