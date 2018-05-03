class CeapTseController < ApplicationController
  def index
    auth = {username: "admin", password: "admin"}
    response = HTTParty.get('http://localhost:2481/class/CotasParlamentares/Parlamentar', basic_auth: auth)
    @parlamentar_count = JSON.parse(response.body)["records"]
    response = HTTParty.get('http://localhost:2481/class/CotasParlamentares/EmpresaFornecedora', basic_auth: auth)
    @empresa_fornecedora_count = JSON.parse(response.body)["records"]
    response = HTTParty.get('http://localhost:2481/class/CotasParlamentares/Transacao', basic_auth: auth)
    @transacoes_count = JSON.parse(response.body)["records"]
  end
end
