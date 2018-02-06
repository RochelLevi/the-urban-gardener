class Api::MessagesController < ApplicationController

  def create

    if Conversation.between(params[:sender_id],params[:recipient_id]).present?
      @conversation = Conversation.between(params[:sender_id],params[:recipient_id]).first
    else
      @conversation = Conversation.create(conversation_params)
    end

    @message = @conversation.messages.new(message_params)
    # @message = Message.new(message_params, conversation_id: @conversation.id)

    if @message.save
      render json: @message
    else
      render json: {errors: @message.errors.full_messages}, status: 422
    end
  end

  private
  def message_params
    params.require(:message).permit(:body, :user_id)
  end

  def conversation_params
    params.permit(:sender_id, :recipient_id)
  end
end
