class Api::AuthController < ApplicationController

  skip_before_action :authorized, only: [:create]

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      render json: {id: user.id, username: user.username, jwt: issue_token(user)}
    else
      render({json: {error: 'User is not valid'}, status: 401})
    end
  end


  def show
    if current_user
      # render json: {id: current_user.id, username: current_user.username, token: issue_token(current_user)}
      redirect_to api_user_path(current_user.id)
    else
      render({json: {error: 'Token is not valid'}, status: 401})
    end
  end


end
