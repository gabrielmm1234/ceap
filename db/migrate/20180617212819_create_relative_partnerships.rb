class CreateRelativePartnerships < ActiveRecord::Migration[5.0]
  def change
    create_table :relative_partnerships do |t|
      t.string :relative_rid
      t.string :company_associated_rid

      t.timestamps
    end
  end
end
