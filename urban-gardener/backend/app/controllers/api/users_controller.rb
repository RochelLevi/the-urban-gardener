class Api::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def show
    @user = User.find(params[:id])

    if @user
      render json: @user
    else
      render json: {errors: "user not found"}, status: 422
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  # def update
  #   @user = User.find(params[:id])
  #
  #   @user.update(user_params)
  #   if @user.save
  #     render json: @user
  #   else
  #     render json: {errors: @user.errors.full_messages}, status: 422
  #   end
  # end
  #
  # def destroy
  #   @user = User.find(params[:id])
  #
  #   if @user
  #     @user.destroy
  #   else
  #     render json: {errors: "user not found"}, status: 422
  #   end
  # end

  private
  def user_params
    params.permit(:email, :username, :password, :street_address, :zip)
  end

end
