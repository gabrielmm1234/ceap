Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'

  get '/ceap_tse' => 'ceap_tse#index'
  get '/deputy_by_group' => 'ceap_tse#deputy_by_group'
  get '/deputy_by_number_of_transactions' => 'ceap_tse#deputy_by_number_of_transactions'
  get '/enterprise_by_number_of_transactions' => 'ceap_tse#enterprise_by_number_of_transactions'
  get '/donations_ceap_tse' => 'ceap_tse#donations_ceap_tse'

  get '/frauds' => 'frauds#index'
  get '/collaborate' => 'frauds#collaborate', as: :collaborate
  get '/ceap_fraud_deputies_partners' => 'frauds#ceap_fraud_deputies_partners'
  get '/ceap_fraud_deputies_relatives' => 'frauds#ceap_fraud_deputies_relatives'

  resources :deputy_partnerships, only: [:create]
  resources :deputy_relatives, only: [:create]
  resources :relative_partnerships, only: [:create]
end
