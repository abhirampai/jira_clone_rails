# frozen_string_literal: true

class CreateIssuesTable < ActiveRecord::Migration[7.0]
  def change
    create_table :issues do |t|
      t.integer :issue_type, default: 0
      t.string :summary
      t.text :description
      t.integer :priority, default: 0
      t.integer :board, default: 0
      t.timestamps
    end
  end
end
