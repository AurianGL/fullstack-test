class FeedbacksController < ApplicationController
  def index
    @messages = Message.includes(:info)
    @res = []
    @messages.each do |message|
      @res << {
        id: message.id,
        content: message.content,
        info: {
          email: message.info.email,
          firstname: message.info.firstname,
          lastname: message.info.lastname
        }
      }
    end
    # here I hate two things 
    # 1. active records doesn't actually return the result of a join query (because in return instances of a specific class)
    # 2. map doesn't work on an array of active record instances 
    # still there is only one query done but I'd like to be able to do @messages.json without having to pass threw the each or some jbuilder syntax
    render json: @res.to_json
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
