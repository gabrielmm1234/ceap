$( document ).ready(function() {
  $.ajax({
    type: "GET",
    url: "/ceap_fraud_deputies_partners",
    success: function(data){
      var s = new sigma('container-graph-partner');
      var label = undefined
      var color = undefined
      var x = undefined
      var y = undefined

      data["result"].forEach(function(item, index) {
        if (item["@class"] == "Transacao") {
          color = '#f00'
          label = item['TxtDescricao'] + " - R$ " + item["VlrReceita"]
          x = Math.random() * index
          y = Math.random() * index
        } else if(item["@class"] == "Parlamentar") {
          color = '#00f'
          label = item['TxNomeParlamentar']
          x = Math.random()
          y = Math.random() * 40
        } else {
          color = '#ec5148'
          label = item['TxtFornecedor']
          x = Math.random() + 50
          y = Math.random() * 40
        }

        s.graph.addNode({
          id: item["@rid"],
          label: label,
          x: x,
          y: y,
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

        if (deputy.length != 0) {
          s.graph.addEdge({
            id: deputy[0]["@rid"] + item["@rid"],
            source: deputy[0]["@rid"],
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
        }
      })

      deputies.forEach(function(item) {
        if (item["out_Socio_De"] != undefined) {
          company = companies.filter(function(company_item) {
            return company_item["in_Socio_De"].includes(item["out_Socio_De"][0])
          })

          if (company.length != 0) {
            s.graph.addEdge({
              id: company[0]["@rid"] + item["@rid"],
              source: item["@rid"],
              target: company[0]["@rid"]
            });
          }
        }
      })
      s.refresh();

    }
  });
})
