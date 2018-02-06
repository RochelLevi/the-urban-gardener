class User < ApplicationRecord
  has_many :listings
  # has_many :conversations, :foreign_key => :sender_id
  # has_many :conversations, :foreign_key => :recipient_id

  has_secure_password

  validates :username, :email, uniqueness: true
  validates :username, format: {with: /\A[a-zA-Z0-9]+\Z/}
  validates :username, :email, :street_address, :zip, presence: true
  validates :password, length: { minimum: 6 }
  validates :zip, length: { is: 5 }
  validates_format_of :email, :with => /@/

  def conversations
    Conversation.all.select do |c|
      c.sender_id == self.id || c.recipient_id == self.id
    end
    # .map do |message|
    #   {id: message.id, body: message.body, conversation_id: message.conversation_id, user_id: message.user_id, read: message.read, message_time: message.message_time}
    # end
  end


end
