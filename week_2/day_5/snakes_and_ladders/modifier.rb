class Modifier

attr_reader :start_position, :spaces_to_travel

  def initialize(start_position, spaces_to_travel)
    @start_position = start_position
    @spaces_to_travel = spaces_to_travel
  end

end
