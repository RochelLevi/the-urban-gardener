class User < ApplicationRecord
  has_many :listings
  # has_many :conversations, :foreign_key => :sender_id
  # has_many :conversations, :foreign_key => :recipient_id

  has_secure_password

  validates :username, :email, uniqueness: true
  validates :username, format: {with: /\A[a-zA-Z0-9]+\Z/, message: "can't contain special characters" }
  validates :username, :email, :street_address, :zip, presence: true
  validates :password, length: { minimum: 6 }
  validates :zip, length: { is: 5 }
  validates_format_of :email, {with: /@/}

  validate :address_is_valid, :zip_is_valid

  URLROOT = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
  ORIGIN = '59 Carlton Rd, 10952'.gsub(' ', '+')
  KEY = ENV['google_key']

  def address_is_valid
    url = "#{URLROOT}origins=#{ORIGIN}&destinations=#{street_address}, #{zip}&key=#{KEY}"
    encoded_url = URI.encode(url)
    buffer = open(encoded_url).read
    result = JSON.parse(buffer)
    if result['destination_addresses'] == [""]
      errors.add(:street_address, ": can't find this address in the provided zip code")
    end
  end


  def zip_is_valid
    url = "#{URLROOT}origins=#{ORIGIN}&destinations=#{zip}&key=#{KEY}"
    encoded_url = URI.encode(url)
    buffer = open(encoded_url).read
    result = JSON.parse(buffer)
    if result['destination_addresses'] == [""]
      errors.add(:zip, " is invalid")
    end
  end

  def conversations
    Conversation.all.select do |c|
      c.sender_id == self.id || c.recipient_id == self.id
    end.map do |c|
      {id: c.id, sender_id: c.sender_id, recipient_id: c.recipient_id, messages: c.messages_cust,
      sender_name: User.find(c.sender_id).username, recipient_name: User.find(c.recipient_id).username}
    end
  end


end
