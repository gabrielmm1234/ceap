class DeputyRelativesController < ApplicationController
  def create
    @deputy_relative = DeputyRelative.new(deputy_relative_params)
    if @deputy_relative.save
      redirect_to root_path, notice: "Colaboração registrada com sucesso!"
    else
      render :collaborate, status: :unprocessable_entity, notice: "Ocorreu um erro! Entre em contato com o administrador."
    end
  end

  private

  def deputy_relative_params
    params.fetch(:deputy_relative, {}).permit(:deputy_relative_name, :deputy_rid)
  end
end
