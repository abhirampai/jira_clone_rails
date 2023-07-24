# frozen_string_literal: true

class AddParentIssueIdToIssue < ActiveRecord::Migration[7.0]
  def change
    add_column :issues, :parent_issue_id, :integer
    add_foreign_key :issues, :issues, column: :parent_issue_id
  end
end
