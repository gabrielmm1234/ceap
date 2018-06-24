class CollaborationsController < ApplicationController
  before_action :authenticate_user!

  def index
    @deputy_partnerships = DeputyPartnership.all
    @deputy_relatives = DeputyRelative.all
    @relative_partnerships = RelativePartnership.all
  end

  def reject_deputy_partnership
    deputy_partnership = DeputyPartnership.find(params[:id])

    if deputy_partnership.destroy
      redirect_to collaborations_path, notice: "Colaboração rejeitada com sucesso"
    else
      redirect_to collaborations_path, notice: "Ocorreu um erro entre em contato com o administrador"
    end
  end

  def reject_deputy_relative
    deputy_relative = DeputyRelative.find(params[:id])

    if deputy_relative.destroy
      redirect_to collaborations_path, notice: "Colaboração rejeitada com sucesso"
    else
      redirect_to collaborations_path, notice: "Ocorreu um erro entre em contato com o administrador"
    end
  end

  def reject_relative_partnership
    relative_partnership = RelativePartnership.find(params[:id])

    if relative_partnership.destroy
      redirect_to collaborations_path, notice: "Colaboração rejeitada com sucesso"
    else
      redirect_to collaborations_path, notice: "Ocorreu um erro entre em contato com o administrador"
    end
  end
end
