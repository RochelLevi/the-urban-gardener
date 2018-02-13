# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'


# JSON.parse(response.body)["images"][0]['display_sizes'][0]['uri']

images = []

search_terms = ['vegetables',  'garden', 'urban garden', 'farm', 'backyard']

search_terms.each do |search_term|
  url = "https://api.gettyimages.com/v3/search/images?phrase=#{search_term}"
  response = RestClient::Request.execute(:method => :get, :url => url, :headers => {'Api-Key' => ENV['getty_images_key']})
  parsed_response = JSON.parse(response.body)

  parsed_response["images"].each do |image|
    images << image['display_sizes'][0]['uri']
  end

end



street_address = ['dunkin donuts', 'starbucks', 'post office', 'McDonalds', 'library', 'police station', 'fire station', 'subway']
queens_zips = ['11361', '11362', '11363', '11364', 	'11354', '11355', '11356', '11358', '11359', '11360', '11365', '11366', '11367', 	'11412', '11423', '11432', '11433', '11434', '11435', '11436', '11101', '11102', '11103', '11104', '11105', '11106', '11374', '11375', '11379', '11385', 	'11691', '11692', '11693', '11694', '11695', '11697', '11004', '11005', '11411', '11413', '11422', '11426', '11427', '11428', '11429', 	'11414', '11415', '11416', '11417', '11418', '11419', '11420', '11421', '11368', '11369', '11370', '11372', '11373', '11377', '11378']
brooklyn_zips = ['11212', '11213', '11216', '11233', '11238', '11209', '11214', '11228', 	'11204', '11218', '11219', '11230', '11234', '11236', '11239', 	'11223', '11224', '11229', '11235', 	'11201', '11205', '11215', '11217', '11231', 	'11203', '11210', '11225', '11226', '11207', '11208', '11211', '11222', '11220', '11232', '11206', '11221', '11237']
zips = queens_zips + brooklyn_zips

sunlight_amounts = ['2 - 4', '4 - 6', '6 - 8', '8 - 10']
desired_garden_types = ['Herb', 'Vegetable', 'Flower']
compensation_types = ['Hybrid', 'Percentage of Crops', 'Monetary']
dollar_compensation_amounts = [50, 60, 70, 75, 100, 125, 150, 160, 180, 200, 250, 300]
percentage_compensation_amounts = [50, 60, 70, 75, 30, 40, 40, 50, 50, 50, 50]

titles = ['Great Small Plot For Planting', 'Would Love Help Turning HUGE Sunny Area Into a Garden', 'Transform Small Backyard Into Garden - Will Chip in For Supplies',
'Seeking Dependable and Responsible Individual to Transform my Front Yard', 'Garden on my .3 Acre Property', 'Looking For a Gardener for Small Shady Plot', 'Need Gardener for Existing Raised Bed - Can Provide all Necessary Garden Tools',
'Small Sunny Garden', 'Porch Garden in Need of Gardener', 'Fertile and Sunny Back Yard']

descriptions = ['Great', 'Small', 'Plot', 'For', 'Planting', 'Would', 'Love', 'Help', 'Turning', 'HUGE', 'Sunny', 'Area', 'Into', 'a', 'Garden', 'Transform', 'Small', 'Backyard', 'Into', 'Garden', 'Will', 'Chip in', 'For', 'Supplies',
'Seeking', 'Dependable', 'and', 'Responsible', 'Individual', 'to', 'Transform,' 'my', 'Yard', 'Garden', 'on', 'my', '.3 Acre', 'Property', 'Looking', 'For', 'a', 'Gardener', 'for', 'Small', 'Shady', 'Plot', 'Need', 'Gardener', 'for', 'Existing', 'Raised', 'Bed', 'Can', 'Provide', 'all', 'Necessary', 'Garden', 'Tools',
'Small', 'Sunny', 'Garden', 'Porch', 'Garden', 'in', 'Need', 'of', 'Gardener', 'Rich Soil', 'Back Yard']

zips.each do |zip|
  street_address.each do |address|

    comp_type = compensation_types.sample
    dollar_comp = (comp_type == 'Percentage of Crops') ? 0 : dollar_compensation_amounts.sample
    percent_comp = (comp_type == 'Monetary') ? 0 : percentage_compensation_amounts.sample
    username = Faker::Internet.unique.user_name
    user = User.create(username: username, email: Faker::Internet.unique.free_email, street_address: address, zip: zip, password: username)

    Listing.create(title: titles.sample, img_url_1: images.sample, img_url_2: images.sample, street_address: address, zip: zip, sunlight_amount: sunlight_amounts.sample, desired_garden_type: desired_garden_types.sample, compensation_type: comp_type, dollar_compensation_amount: dollar_comp, percentage_compensation_amount: percent_comp, user_id: user.id, description: descriptions.sample(100).join(' '))
  end
end



rochel = User.create(username: 'rochel', email: 'rochel@rochel.com', street_address: '59 Carlton Rd', zip: '10952', password: 'rochel123')
adam = User.create(username: 'adam', email: 'adam@adam.com', street_address: '59 Carlton Rd', zip: '10952', password: 'adam123')
george = User.create(username: 'george', email: 'george@george.com', street_address: '59 Carlton Rd', zip: '10952', password: 'george123')

listing1 = Listing.create(title: 'Large Sunny Area in Kew Gardens - Perfect for Planting Produce', img_url_1: 'https://s3.amazonaws.com/homestratosphere/wp-content/uploads/2016/02/29182351/1-Backyard-Tree-Ideas-iStock.jpg', img_url_2: 'https://www.pinderful.net/uploads/pins/2015/07/big/55d02426c1ee3358213bbe15861fd38b.jpeg', street_address: 'Dunkin Donuts', zip: '11415', sunlight_amount: '6-8 hours', desired_garden_type: 'Vegetable', compensation_type: 'Percentage of Crops', dollar_compensation_amount: 0, percentage_compensation_amount: 35, user_id: rochel.id, description: 'sunny spot great for growing vegetables')
listing2 = Listing.create(title: 'Small Partly Sunny Area in Kew Gardens - Perfect for Planting Herbs', img_url_1: 'https://www.pinderful.net/uploads/pins/2015/07/big/55d02426c1ee3358213bbe15861fd38b.jpeg', img_url_2: 'https://s3.amazonaws.com/homestratosphere/wp-content/uploads/2016/02/29182351/1-Backyard-Tree-Ideas-iStock.jpg', street_address: 'starbucks', zip: '11415', sunlight_amount: '4-6 hours', desired_garden_type: 'Herb', compensation_type: 'Hybrid', dollar_compensation_amount: 10, percentage_compensation_amount: 50, user_id: adam.id, description: 'partly shady spot will grow beatiful herbs. specifically want basil, rosemary, and parsey, but there is room for many other herbs of gardeners choice')

rochel_adam = Conversation.create(sender_id: rochel.id, recipient_id: adam.id)


rl_adk_message = Message.create(body: 'hello adam!', conversation_id: rochel_adam.id, user_id: rochel.id)
