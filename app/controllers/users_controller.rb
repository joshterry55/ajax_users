class UsersController < ApplicationController
  def index
    flash[:success] = 'WELCOME'
  end
end
