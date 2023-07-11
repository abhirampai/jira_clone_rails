# frozen_string_literal: true

json.boards Issue.boards.keys.map(&:humanize)

json.issues @issues do |board, issues|
  json.board board.humanize
  json.issues issues do |issue|
    json.extract! issue,
      :id,
      :summary,
      :priority,
      :issue_type
  end
  json.board_total_count issues.size
end

json.total_issues_count Issue.all.size
