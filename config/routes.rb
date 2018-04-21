Rails.application.routes.draw do
  root 'home#index'
  get 'home/index'
  resources :ceap_tse, only: [:index]
end
