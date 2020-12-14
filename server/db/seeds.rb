# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

puts 'reseting db'

Message.destroy_all
Info.destroy_all

puts 'creating 10 infos with message'

10.times do 
  firstname = Faker::Games::WarhammerFantasy.hero
  lastname = Faker::Games::WarhammerFantasy.location
  info = Info.create!(
    firstname: firstname,
    lastname: lastname,
    email: "#{firstname}.#{lastname}@40k.com"
  )
  content = Faker::Games::WarhammerFantasy.quote
  message = Message.create!(
    content: Faker::Games::WarhammerFantasy.quote,
    info: info
  )
  puts
  puts "#{firstname} of #{lastname} joined the battlefield"
  puts "#{content}"
  puts
end
