class Info < ApplicationRecord
  has_many :messages
  validates :email, :uniqueness: true, presence: true
end
