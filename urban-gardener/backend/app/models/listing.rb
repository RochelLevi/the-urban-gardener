class Listing < ApplicationRecord
  belongs_to :user

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: 'https://www.google.com/imgres?imgurl=http%3A%2F%2Fvectortoons.com%2Fwp-content%2Fuploads%2F2017%2F06%2Fa-vegetable-garden-background.jpg&imgrefurl=http%3A%2F%2Fgardencontainer.wndrs.com%2Fgarden-cartoon%2F&docid=9jT340iLA2dLOM&tbnid=zkwLwMF75_jiDM%3A&vet=10ahUKEwjN9PLW5YXZAhWFo1kKHTKwAvkQMwigAihfMF8..i&w=1024&h=576&itg=1&bih=627&biw=1260&q=garden%20cartoon%20images&ved=0ahUKEwjN9PLW5YXZAhWFo1kKHTKwAvkQMwigAihfMF8&iact=mrc&uact=8'


  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/
  validates :title, :street_address, :zip, :sunlight_amount, :desired_garden_type, :compensation_type, :dollar_compensation_amount, :percentage_compensation_amount, :user_id, :description, presence: true

end
