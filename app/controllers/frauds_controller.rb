class FraudsController < ApplicationController
  def index
  end

  def collaborate
    @deputy_partnership = DeputyPartnership.new
    @deputy_relative = DeputyRelative.new
    @relative_partnership = RelativePartnership.new

    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/select TxNomeParlamentar, @rid from Parlamentar')
    deputies_response = HTTParty.get(encoded_url, basic_auth: auth)

    @deputies = []
    deputies_response["result"].each do |deputy|
      @deputies << [deputy["TxNomeParlamentar"], deputy["rid"]]
    end

    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/select TxtFornecedor, @rid from EmpresaFornecedora')
    companies_response = HTTParty.get(encoded_url, basic_auth: auth)

    @companies = []
    companies_response["result"].each do |company|
      @companies << [company["TxtFornecedor"], company["rid"]]
    end

    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/select nome, @rid from Pessoa')
    relatives_response = HTTParty.get(encoded_url, basic_auth: auth)

    @relatives = []
    relatives_response["result"].each do |relative|
      @relatives << [relative["nome"], relative["rid"]]
    end
  end

  def ceap_fraud_deputies_partners
    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/MATCH {class:Parlamentar, as:p} -RealizaTransacao-> {class:Transacao, as:t} -FornecidaPor-> {class:EmpresaFornecedora, as:e}, {as:p} -Socio_De-> {as:e} RETURN $elements')
    response = HTTParty.get(encoded_url, basic_auth: auth)

    render json: response
  end

  def ceap_fraud_deputies_relatives
    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/MATCH {class:Parlamentar, as:p} -RealizaTransacao-> {class:Transacao, as:t} -FornecidaPor-> {class:EmpresaFornecedora, as:e},{as:p} -Parente_De-> {class:Pessoa, as:p2} -Socio_De-> {as:e} RETURN $elements')
    response = HTTParty.get(encoded_url, basic_auth: auth)

    render json: response
  end

  private

  def auth
    return { username: "admin", password: "admin" }
  end
end
