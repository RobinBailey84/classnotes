class Bear
  attr_reader :name, :type

  def initialize(name, type)
    @name = name
    @type = type
    @stomach = []
  end

  def count_stomach
    return @stomach.size()
  end

  def eat_fish(fish_to_be_eaten)
    @stomach << fish_to_be_eaten
  end

  def eat_from_river(river)
    # removes a fish from the river
    removed_fish = river.remove_fish()

    # bear eats the removed fish
    eat_fish(removed_fish)
  end

  def roar()
    return "ROAR!"
  end
end
