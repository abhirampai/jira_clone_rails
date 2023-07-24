# frozen_string_literal: true

json.extract! @issue,
  :id,
  :summary,
  :priority,
  :issue_type,
  :description,
  :display_name,
  :owner_name
