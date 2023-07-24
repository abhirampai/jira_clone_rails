# frozen_string_literal: true

json.extract! @issue,
  :id,
  :summary,
  :priority,
  :issue_type,
  :description,
  :display_name,
  :owner_name

if @issue.parent_issue.present?
  json.parent_id @issue.parent_issue_id
  json.parent_display_name @issue.parent_display_name
end

if @issue.sub_issues.present?
  json.sub_issues @issue.sub_issues do |sub_issue|
    json.extract! sub_issue,
      :id,
      :summary,
      :priority,
      :issue_type
  end
end
