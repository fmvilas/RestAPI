json.array!(@tasks) do |task|
  json.extract! task, :id, :title, :picture, :description
  json.url task_url(task, format: :json)
end
