ruby '2.2.5'
source 'https://rubygems.org'

# Setup Rails and API
gem 'rails', '>= 5.0.x'
gem 'pg'

# Web Server
gem 'puma'

# SASS
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'

# HTTP requests and caching
gem 'octokit'
gem 'typhoeus'
gem 'faraday-http-cache'

# Background workers
gem 'sidekiq'
gem 'connection_pool'
gem 'redis-namespace'

# Setup caching and Marshalling
gem 'dalli'

# Throttle Malacious requests
gem 'rack-attack'

# Speed up links
gem 'turbolinks', '~> 5.0.x'

# Omniauth login
gem 'omniauth-github'
gem 'devise'

# CORS
gem 'rack-cors', :require => 'rack/cors'

# Client side routes
gem 'js-routes'

# Graphql
gem 'graphql'

# Auth token
gem 'jwt'

# Mail delivery
gem 'mailgun_rails'

group :production do
  gem 'rails_12factor'
end

group :development do
  gem 'graphiql-rails'
  gem 'spring'
  gem 'foreman'
  gem 'rubocop'
  gem 'figaro'
end
