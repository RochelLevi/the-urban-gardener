class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :img_url_1, :img_url_2, :avatar, :avatar_2, :street_address, :zip, :sunlight_amount, :desired_garden_type, :compensation_type, :dollar_compensation_amount, :percentage_compensation_amount, :user_id, :description

end
