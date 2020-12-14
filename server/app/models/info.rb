class Info < ApplicationRecord
  has_many :messages
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :email, uniqueness: true, presence: true
end
