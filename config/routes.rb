# frozen_string_literal: true

Rails.application.routes.draw do
  defaults format: :json do
    namespace :api do
      namespace :v1 do
        resources :issues
      end
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
