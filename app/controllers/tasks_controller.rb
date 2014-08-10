class TasksController < ApplicationController
  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.all

    render json: @tasks
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    @task = Task.find(params[:id])

    render json: @task
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new do |t|
      t.title = params[:title]
      t.picture = params[:picture]
      t.description = params[:description]
      t.color = params[:color] || 'white'
      t.date = params[:date]
      t.order = params.has_key?(:order) ? params[:order] : 0
    end

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    @task = Task.find(params[:id])

    @task.title = params[:title] || @task.title
    @task.picture = params.has_key?(:picture) ? params[:picture] : @task.picture
    @task.description = params[:description] || @task.description
    @task.color = params[:color] || @task.color
    @task.date = params.has_key?(:date) ? params[:date] : @task.date
    @task.order = params[:order] || @task.order

    if @task.save
      head :no_content
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    head :no_content
  end
end
