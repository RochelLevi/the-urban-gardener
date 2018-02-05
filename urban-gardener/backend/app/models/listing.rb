class Listing < ApplicationRecord
  belongs_to :user

  # has_attached_file :avatar, styles: { small: "64x64", med: "100x100", large: "200x200" }
  # validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

  validates :title, :street_address, :zip, :sunlight_amount, :desired_garden_type, :compensation_type, :dollar_compensation_amount, :percentage_compensation_amount, :user_id, :description, presence: true

  # def photo
  #   self.avatar.url
  # end
end
