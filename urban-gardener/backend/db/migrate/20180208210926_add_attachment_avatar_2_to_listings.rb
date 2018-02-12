class AddAttachmentAvatar2ToListings < ActiveRecord::Migration[5.1]
  def self.up
    change_table :listings do |t|
      t.attachment :avatar_2
    end
  end

  def self.down
    remove_attachment :listings, :avatar_2
  end
end
