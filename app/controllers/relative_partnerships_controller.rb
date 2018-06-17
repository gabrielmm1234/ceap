class RelativePartnershipsController < ApplicationController
  def create
    @relative_partnership = RelativePartnership.new(relative_partnership_params)
    if @relative_partnership.save
      redirect_to root_path, notice: "Colaboração registrada com sucesso!"
    else
      render :collaborate, status: :unprocessable_entity, notice: "Ocorreu um erro! Entre em contato com o administrador."
    end
  end

  private

  def relative_partnership_params
    params.fetch(:relative_partnership, {}).permit(:relative_rid, :company_associated_rid)
  end
end
