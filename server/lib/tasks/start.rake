
namespace :welink do 
  desc "Installation des dépendance pour le serveur et le client"
  task :install do
    exec 'bundle install && cd client && yarn install && cd ..'
  end

  desc "lance serveur et client via foreman"
  task :start do
    exec 'foreman start -p 3000'
  end
end
