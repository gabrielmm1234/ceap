class CreateDeputyRelatives < ActiveRecord::Migration[5.0]
  def change
    create_table :deputy_relatives do |t|
      t.string :deputy_relative_name
      t.string :deputy_rid

      t.timestamps
    end
  end
end
