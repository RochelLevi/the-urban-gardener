class ConversationMessageSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :recipient_id, :messages

end
