# frozen_string_literal: true

json.extract! @issue,
  :id,
  :summary,
  :priority,
  :issue_type
