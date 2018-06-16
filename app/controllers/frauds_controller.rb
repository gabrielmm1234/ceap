class FraudsController < ApplicationController
  def index
  end

  def ceap_fraud_deputies_partners
    encoded_url = URI.encode('http://localhost:2481/query/CotasParlamentares/sql/MATCH {class:Parlamentar, as:p} -RealizaTransacao-> {class:Transacao, as:t} -FornecidaPor-> {class:EmpresaFornecedora, as:e}, {as:p} -Socio_De-> {as:e} RETURN $elements')
    response = HTTParty.get(encoded_url, basic_auth: auth)

    render json: response
  end

  private

  def auth
    return { username: "admin", password: "admin" }
  end
end
