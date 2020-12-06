
namespace :welink do 
  desc "Installation des dépendance pour le serveur et le client"
  task :install do
    exec 'bundle install && cd client && yarn install && cd ..'
  end

  desc "lance serveur et client via foreman"
  task :start do
    exec 'rake welink:ascii && foreman start -p 3000'
  end

  desc 'display some dumb fuck sauce stuff'
  task :ascii do 
    puts
    puts
    File.open(File.join(Rails.root, "app/assets/slaanesh.txt")) do |file|
      while line = file.gets
        puts line
      end
    end
    puts
    puts
  end

  desc 'create migrate and seed'
  task :db do
    exec 'rails db:drop db:create db:migrate db:seed'
  end

  desc 'install, init db, launch server'
  task all: [:db, :install, :start]
end
