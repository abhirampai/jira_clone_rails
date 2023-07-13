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

  validates :summary, presence: true

  def self.ransackable_associations(auth_object = nil)
    []
  end
end
