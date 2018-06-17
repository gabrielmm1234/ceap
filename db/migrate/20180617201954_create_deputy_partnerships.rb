class CreateDeputyPartnerships < ActiveRecord::Migration[5.0]
  def change
    create_table :deputy_partnerships do |t|
      t.string :deputy_name
      t.string :deputy_rid
      t.string :company_associated_name
      t.string :company_associated_rid

      t.timestamps
    end
  end
end
