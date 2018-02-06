class Conversation < ApplicationRecord
  # belongs_to :sender, :foreign_key => :sender_id, class_name: "User"
  # belongs_to :recipient, :foreign_key => :recipient_id, class_name: "User"
  has_many :messages, dependent: :destroy

  validates_uniqueness_of :sender_id, :scope => :recipient_id

  def self.between(sender_id,recipient_id)
    where("(conversations.sender_id = #{sender_id} AND conversations.recipient_id = #{recipient_id}) OR (conversations.sender_id = #{recipient_id} AND conversations.recipient_id = #{sender_id})")
  end

  def messages_cust
    self.messages.map do |message|
      {id: message.id, body: message.body, conversation_id: message.conversation_id, user_id: message.user_id, read: message.read, message_time: message.message_time}
    end
  end

end
