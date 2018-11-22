class StarSystem
  attr_reader :name, :planets

  def initialize(name, planets)
    @name = name
    @planets = planets
  end

  def planet_names
    return @planets.map{ |planet| planet.name }
  end

  def get_planet_by_name(name)
    return @planets.find{ |planet| planet.name == name}
  end

  def get_largest_planet
    return @planets.max_by { |planet| planet.diameter }
  end

  def get_smallest_planet
    return @planets.min_by { |planet| planet.diameter }
  end

  def get_planets_with_no_moons
    return @planets.select { |planet| planet.number_of_moons == 0 }
  end

  def get_planets_with_more_moons(number)
    planets_found = @planets.select { |planet| planet.number_of_moons > number}
    return planets_found.map { |planet| planet.name }
  end

  def get_number_of_planets_closer_than(distance)
    return @planets.count { |planet| planet.distance_from_sun < distance }
  end

  def get_total_number_of_moons
    total_moons = @planets.reduce(0) { |total, planet | total + planet.number_of_moons }
    return total_moons
  end

  def get_planet_names_sorted_by_increasing_distance_from_sun
    planets_by_distance = @planets.sort_by{ |planet| planet.distance_from_sun }
    return planets_by_distance.map { |planet| planet.name }
  end

  def get_planet_names_sorted_by_size_decreasing
    planets_by_size = @planets.sort { |planet1, planet2| planet2.diameter <=> planet1.diameter }
    return planets_by_size.map { |planet| planet.name }
  end

end
