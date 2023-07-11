# frozen_string_literal: true

class Api::V1::IssuesController < ApplicationController
  before_action :fetch_issue, only: %i[show update]

  def search
    @issues = search_query
    render
  end

  def index
    @issues = Issue.all.group_by(&:board)
    render
  end

  def show
    render
  end

  def create
    @issue = Issue.create(issue_params)
    render_notice(t("issues.created_successfully"))
  end

  def update
    @issue.update(issue_params)
    render_notice(t("issues.updated_successfully"))
  end

  private

    def issue_params
      params.require(:issue).permit(:summary, :description, :issue_type, :priority, :board)
    end

    def search_query
      Issue.ransack(id_or_summary_or_description_or_priority_or_issue_type_cont: params[:search]).result.distinct
    end

    def fetch_issue
      @issue = Issue.find_by(id: params[:id])
    end
end
