Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'

  get '/ceap_tse' => 'ceap_tse#index'
  get '/deputy_by_group' => 'ceap_tse#deputy_by_group'
  get '/deputy_by_number_of_transactions' => 'ceap_tse#deputy_by_number_of_transactions'
  get '/enterprise_by_number_of_transactions' => 'ceap_tse#enterprise_by_number_of_transactions'
  get '/donations_ceap_tse' => 'ceap_tse#donations_ceap_tse'

  get '/frauds' => 'frauds#index'
  get '/ceap_fraud_deputies_partners' => 'frauds#ceap_fraud_deputies_partners'
end
