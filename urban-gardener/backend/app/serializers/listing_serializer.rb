class ListingSerializer < ActiveModel::Serializer
  attributes :id, :img_url, :street_address, :zip, :sunlight_amount, :desired_garden_type, :compensation_type, :dollar_compensation_amount, :percentage_compersation_amount, :user_id, :description

end
