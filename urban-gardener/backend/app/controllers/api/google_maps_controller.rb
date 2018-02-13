class Api::GoogleMapsController < ApplicationController

  require 'open-uri'
  require 'json'


  def fetch_distance

    url_root = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    origin = params[:origin]
    key = ENV['google_key']
    destination = params[:destination]

    url = "#{url_root}origins=#{origin}&destinations=#{destination}&key=#{key}&units=imperial&mode=walking"

    encoded_url = URI.encode(url)
    buffer = open(encoded_url).read
    result = JSON.parse(buffer)

    render json: result

  end

end
