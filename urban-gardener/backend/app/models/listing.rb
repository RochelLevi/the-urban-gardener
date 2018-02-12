require 'open-uri'
require 'json'

class Listing < ApplicationRecord
  belongs_to :user

  has_attached_file :avatar,
    # :styles => { small: "64x64", med: "100x100", large: "200x200" },
    style: { :medium => "300x300>" }, default_url: "https://www.biddwell.com/static/img/default-home.jpg",
    :s3_protocol => 'https',
    :s3_host_name => 's3.us-east-2.amazonaws.com',
    :path => '/avatar/:filename',
    :storage => :s3,
    :s3_credentials => Proc.new{|a| a.instance.s3_credentials },
    :s3_region => 'us-east-2'

  validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  has_attached_file :avatar_2,
    # :styles => { small: "64x64", med: "100x100", large: "200x200" },
    style: { :medium => "300x300>" }, default_url: "https://www.biddwell.com/static/img/default-home.jpg",
    :s3_protocol => 'https',
    :s3_host_name => 's3.us-east-2.amazonaws.com',
    :path => '/avatar/:filename',
    :storage => :s3,
    :s3_credentials => Proc.new{|a| a.instance.s3_credentials },
    :s3_region => 'us-east-2'

  validates_attachment_content_type :avatar_2, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]



  def s3_credentials
    {:bucket => 'the-urban-gardener-listing-photos', :access_key_id => ENV['AWSAccessKeyId'], :secret_access_key => ENV['AWSSecretKey']}
  end


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
