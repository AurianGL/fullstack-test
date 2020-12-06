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
    # puts params[:info][:email]    
    @info = Info.find_by(email: info_params[:email])
    unless @info
      @info = Info.new(info_params)
      return render_error(@info) unless @info.save 
    end
    @message = Message.new(message_params)
    puts @info
    @message.info = @info
    if @message.save
      render json: { message: 'success'}, status: :created
    else
      render_error(@message)
    end
  end

  private

  def info_params 
    params.require(:info).permit(:email, :firstname, :lastname)
  end

  def message_params 
    params.require(:message).permit(:content)
  end

  def render_error(entity)
    render json: { errors: entity.errors.full_messages },
      status: :unprocessable_entity
  end
end
