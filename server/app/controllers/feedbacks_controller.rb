class FeedbacksController < ApplicationController
  def hello_world
    render json: {message: 'hello world'}
  end

  def new
    render json: { message: 'hell world'}
  end
  
  def create
    unless @info = Info.where(email: info_params.email)
      @info = Info.new(info_params)
      @info.save
    end
    @message = Message.new(message_params)
    @message.info = @info
    if @message.save
      render json: { message: 'succes'}, status: :created
    else
      render_error
    end
  end

  private

  def info_params 
    params.require(:info).permit(:email, :first_name, :last_name)
  end

  def message_params 
    params.require(:message).permit(:content)
  end

  def render_error
    render json: { errors: @info.errors.full_messages },
      status: :unprocessable_entity
  end
end
