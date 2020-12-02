namespace :install_dep do
  exec 'bundle install && cd client && yarn install && cd ..'
end
