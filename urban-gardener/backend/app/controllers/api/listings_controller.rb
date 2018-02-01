class Api::ListingsController < ApplicationController

  def index
    @listings = Listing.all
    render json: @listings
  end

  def show
    @listing = Listing.find(params[:id])

    if @listing
      render json: @listing
    else
      render json: {errors: "listing not found"}, status: 422
    end
  end

  def create
    @listing = Listing.new(listing_params)

    if @listing.save
      render json: @listing
    else
      render json: {errors: @listing.errors.full_messages}, status: 422
    end
  end

  # def update
  #   @listing = Listing.find(params[:id])
  #
  #   @listing.update(listing_params)
  #   if @listing.save
  #     render json: @listing
  #   else
  #     render json: {errors: @listing.errors.full_messages}, status: 422
  #   end
  # end
  #
  def destroy
    @listing = Listing.find(params[:id])

    if @listing
      @listing.destroy
    else
      render json: {errors: "listing not found"}, status: 422
    end
  end

  private
  def listing_params
    params.permit(:avatar, :img_url, :street_address, :zip, :sunlight_amount, :desired_garden_type, :compensation_type, :dollar_compensation_amount, :percentage_compersation_amount, :user_id, :description)
  end

end
