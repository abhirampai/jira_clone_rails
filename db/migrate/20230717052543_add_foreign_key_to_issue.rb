# frozen_string_literal: true

class AddForeignKeyToIssue < ActiveRecord::Migration[7.0]
  def change
    add_column :issues, :owner_id, :integer
    add_foreign_key :issues, :users, column: :owner_id
  end
end
