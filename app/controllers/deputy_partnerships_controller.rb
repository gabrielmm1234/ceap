class DeputyPartnershipsController < ApplicationController
  def create
    @deputy_partnership = DeputyPartnership.new(deputy_partnership_params)
    if @deputy_partnership.save
      redirect_to root_path, notice: "Colaboração registrada com sucesso!"
    else
      render :collaborate, status: :unprocessable_entity, notice: "Ocorreu um erro! Entre em contato com o administrador."
    end
  end

  private

  def deputy_partnership_params
    params.fetch(:deputy_partnership, {}).permit(:deputy_name, :deputy_rid, :company_associated_name, :company_associated_rid)
  end
end
