require 'open-uri'
require 'json'

class Listing < ApplicationRecord
  belongs_to :user

  # has_attached_file :avatar, styles: { small: "64x64", med: "100x100", large: "200x200" }
  # validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  validates :title, :street_address, :zip, :sunlight_amount, :desired_garden_type, :compensation_type, :dollar_compensation_amount, :percentage_compensation_amount, :user_id, :description, presence: true
  validates :zip, length: { is: 5 }
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

end
