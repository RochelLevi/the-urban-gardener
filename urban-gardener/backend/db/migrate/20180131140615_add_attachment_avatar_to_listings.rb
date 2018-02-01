class AddAttachmentAvatarToListings < ActiveRecord::Migration[5.1]
  def self.up
    change_table :listings do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :listings, :avatar
  end
end
