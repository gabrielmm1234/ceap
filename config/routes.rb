Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'
  resources :ceap_tse, only: [:index]

  get '/deputy_by_group' => 'ceap_tse#deputy_by_group'
end
