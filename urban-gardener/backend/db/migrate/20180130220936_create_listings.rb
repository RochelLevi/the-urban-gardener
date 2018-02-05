class CreateListings < ActiveRecord::Migration[5.1]
  def change
    create_table :listings do |t|
      t.text :title
      t.binary :img_url_1, limit: 3.megabytes
      t.binary :img_url_2, limit: 3.megabytes
      t.text :street_address
      t.text :zip
      t.text :sunlight_amount
      t.text :desired_garden_type
      t.text :compensation_type
      t.integer :dollar_compensation_amount
      t.integer :percentage_compensation_amount
      t.integer :user_id
      t.text :description

      t.timestamps
    end
  end
end
