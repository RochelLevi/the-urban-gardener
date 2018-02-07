# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

rochel = User.create(username: 'rochel', email: 'rochel@rochel.com', street_address: '59 Carlton Rd', zip: '10952', password: 'rochel123')
adam = User.create(username: 'adam', email: 'adam@adam.com', street_address: '59 Carlton Rd', zip: '10952', password: 'adam123')
george = User.create(username: 'george', email: 'george@george.com', street_address: '59 Carlton Rd', zip: '10952', password: 'george123')

listing1 = Listing.create(title: 'Large Sunny Area in Kew Gardens - Perfect for Planting Produce', img_url_1: 'https://s3.amazonaws.com/homestratosphere/wp-content/uploads/2016/02/29182351/1-Backyard-Tree-Ideas-iStock.jpg', img_url_2: 'https://www.pinderful.net/uploads/pins/2015/07/big/55d02426c1ee3358213bbe15861fd38b.jpeg', street_address: 'Dunkin Donuts', zip: '11415', sunlight_amount: '6-8 hours', desired_garden_type: 'Vegetable', compensation_type: 'Percentage of Crops', dollar_compensation_amount: 0, percentage_compensation_amount: 35, user_id: rochel.id, description: 'sunny spot great for growing vegetables')
listing2 = Listing.create(title: 'Small Partly Sunny Area in Kew Gardens - Perfect for Planting Herbs', img_url_1: 'https://www.pinderful.net/uploads/pins/2015/07/big/55d02426c1ee3358213bbe15861fd38b.jpeg', img_url_2: 'https://s3.amazonaws.com/homestratosphere/wp-content/uploads/2016/02/29182351/1-Backyard-Tree-Ideas-iStock.jpg', street_address: 'starbucks', zip: '11415', sunlight_amount: '4-6 hours', desired_garden_type: 'Herb', compensation_type: 'Hybrid', dollar_compensation_amount: 10, percentage_compensation_amount: 50, user_id: adam.id, description: 'partly shady spot will grow beatiful herbs. specifically want basil, rosemary, and parsey, but there is room for many other herbs of gardeners choice')

rochel_adam = Conversation.create(sender_id: rochel.id, recipient_id: adam.id)


rl_adk_message = Message.create(body: 'hello adam!', conversation_id: rochel_adam.id, user_id: rochel.id)
