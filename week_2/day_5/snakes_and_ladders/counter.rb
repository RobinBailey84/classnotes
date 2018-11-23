class Counter

  attr_reader :colour, :position

  def initialize(colour)
    @colour = colour
    @position = 0
  end

  def move(spaces)
    @position += spaces
  end
end
