class CollaborationsController < ApplicationController
  before_action :authenticate_user!

  def index
    @deputy_partnerships = DeputyPartnership.all
    @deputy_relatives = DeputyRelative.all
    @relative_partnerships = RelativePartnership.all
  end
end
