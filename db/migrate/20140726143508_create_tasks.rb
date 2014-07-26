class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :picture
      t.text :description

      t.timestamps
    end
  end
end
