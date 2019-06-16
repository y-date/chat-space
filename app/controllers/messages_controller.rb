class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = Messege.new(messages_params)
    if @message.save
      redirect_to group_messages_path(@group), notice: "メッセージが送信されました"
    else


  end


  private
  def messages_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
