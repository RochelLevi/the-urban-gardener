class ApplicationController < ActionController::API

  before_action :authorized
 # this will run before every single action gets called, make sure you skip_before_action in the appropriate places


  def issue_token(user)
  # user.id
    token = JWT.encode({id: user.id}, 'secret', 'HS256')
    # your secret should be in another file that is .gitignore'd, use a gem like 'figaro' to manage
  end

  def token
    begin
      JWT.decode(request.headers['Authorization'], 'secret', true, { :algorithm => 'HS256' })
    rescue JWT::DecodeError
      [{}]
    end
  end

  def user_id
    token.first["id"]
  end


  def current_user
    @user ||= User.find_by(id: user_id )
  end

  def authorized
    render json: {message: "Not welcome" }, status: 401 unless logged_in?
  end

  def logged_in?
    !!current_user
  end
end
