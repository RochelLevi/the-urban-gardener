class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.text :email
      t.text :username
      t.text :password_digest
      t.text :street_address
      t.text :zip


      t.timestamps
    end
  end
end
