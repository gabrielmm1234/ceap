class CeapTseController < ApplicationController
  def index
    auth = {username: "admin", password: "admin"}
    response = HTTParty.get('http://localhost:2481/class/CotasParlamentares/Parlamentar', basic_auth: auth)
    @parlamentar_count = JSON.parse(response.body)["records"]
    response = HTTParty.get('http://localhost:2481/class/CotasParlamentares/EmpresaFornecedora', basic_auth: auth)
    @empresa_fornecedora_count = JSON.parse(response.body)["records"]
    response = HTTParty.get('http://localhost:2481/class/CotasParlamentares/Transacao', basic_auth: auth)
    @transacoes_count = JSON.parse(response.body)["records"]

    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/MATCH {class:Parlamentar, as:p} -RealizaTransacao-> {class:Transacao, as:t} -FornecidaPor-> {class:EmpresaFornecedora, as:e}, {as:e} -RealizaTransacao-> {class:Transacao, as:t2} -FornecidaPara-> {as:p} RETURN p.TxNomeParlamentar,e.TxtFornecedor limit 500')
    response = HTTParty.get(encoded_url, basic_auth: auth)
    @deputies_in_donations_name = JSON.parse(response.body)["result"]
  end

  def deputy_by_group
    encoded_url = URI.encode("http://localhost:2481/query/CotasParlamentares/sql/select SgPartido, count(SgPartido) from Parlamentar GROUP BY SgPartido")
    response = HTTParty.get(encoded_url, basic_auth: auth)

    render json: response
  end

  def deputy_by_number_of_transactions
    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/select TxNomeParlamentar, SgPartido, out("RealizaTransacao").size() as transacoes from Parlamentar order by transacoes desc limit 10')
    response = HTTParty.get(encoded_url, basic_auth: auth)

    render json: response
  end

  def enterprise_by_number_of_transactions
    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/select TxtFornecedor, in("FornecidaPor").size() as servicos from EmpresaFornecedora order by servicos desc limit 15')
    response = HTTParty.get(encoded_url, basic_auth: auth)

    render json: response
  end

  def donations_ceap_tse
    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/MATCH {class:Parlamentar, as:p} -RealizaTransacao-> {class:Transacao, as:t} -FornecidaPor-> {class:EmpresaFornecedora, as:e}, {as:e} -RealizaTransacao-> {class:Transacao, as:t2} -FornecidaPara-> {as:p} RETURN $elements limit 500')
    response = HTTParty.get(encoded_url, basic_auth: auth)

    render json: response
  end

  private

  def auth
    return { username: "admin", password: "admin" }
  end
end
