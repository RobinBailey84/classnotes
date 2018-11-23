class Board

  attr_reader :number_of_squares

  def initialize(number_of_squares, snakes_ladders)
    @number_of_squares = number_of_squares
    @snakes_ladders = snakes_ladders
  end


  def check_snake_or_ladder(position)
    @snakes_ladders.each do |modifier|
      if modifier.start_position() == position
        return modifier.spaces_to_travel()
      end
    end
    return 0
  end

end
