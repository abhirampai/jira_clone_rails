# frozen_string_literal: true

class Issue < ApplicationRecord
  enum issue_type: {
    task: 0,
    bug: 1,
    story: 2
  }

  enum priority: {
    medium: 0,
    low: 1,
    high: 2
  }

  enum board: {
    backlog: 0,
    in_development: 1,
    in_progress: 2,
    completed: 3
  }

  belongs_to :parent_issue, foreign_key: :parent_issue_id, class_name: "Issue", required: false
  belongs_to :owner, foreign_key: :owner_id, class_name: "User"

  has_many :sub_issues, foreign_key: :parent_issue_id, class_name: "Issue"

  validates :summary, presence: true

  delegate :name, to: :owner, prefix: :owner

  delegate :display_name, to: :parent_issue, prefix: :parent

  def self.ransackable_associations(auth_object = nil)
    []
  end

  def self.ransackable_attributes(auth_object = nil)
    ["board", "created_at", "description", "id", "issue_type", "priority", "summary", "updated_at"]
  end

  def display_name
    "Issue-#{id}"
  end
end
