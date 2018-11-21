class River
  attr_reader :name

  def initialize(name, fishes)
    @name = name
    @fishes = fishes
  end

  def count_fishes
    return @fishes.size()
  end

  def remove_fish
    fish_removed = @fishes.shift()
    return fish_removed
  end
end
