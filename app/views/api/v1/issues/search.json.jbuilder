# frozen_string_literal: true

json.issues @issues do |issue|
    json.extract! issue,
      :id,
      :summary,
      :priority,
      :issue_type,
      :description
  end
