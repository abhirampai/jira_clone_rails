# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  MAX_EMAIL_LENGTH = 255

  has_secure_password
  has_secure_token :authentication_token

  has_many :issues, foreign_key: :owner_id

  validates :name, presence: true, length: { maximum: 35 }
  validates :email, presence: true,
    uniqueness: { case_sensitive: false },
    length: { maximum: MAX_EMAIL_LENGTH },
    format: { with: VALID_EMAIL_REGEX }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create

  before_save :to_lowercase
  before_save :titleize_name

  private

    def to_lowercase
      email.downcase!
    end

    def titleize_name
      name.titleize
    end
end
