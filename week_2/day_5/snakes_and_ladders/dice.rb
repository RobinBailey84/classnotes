class Dice

attr_reader :sides

  def initialize(sides)
    @sides = sides
  end

  def roll()
    return rand(1..@sides)
  end

end
