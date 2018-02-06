class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :street_address, :zip

  has_many :listings
  has_many :conversations
end
