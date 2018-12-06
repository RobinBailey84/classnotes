require_relative('../models/student')
require_relative('../models/house')

get '/houses' do
  @houses = House.all
  erb(:"houses/index")
end

get '/houses/:id' do
  @house = House.find(params['id'])
  @students = @house.students()
  erb(:"houses/show")
end
