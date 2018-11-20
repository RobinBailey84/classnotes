class PetShop

  attr_reader :name, :cash, :pets_sold

  def initialize(name, cash, pets)
    @name = name
    @cash = cash
    @pets_sold = 0
    @pets = pets
  end

  def pet_count()
    return @pets.size()
  end

  def add_pet(pet)
    @pets << pet
  end

  def get_total_of_pet_prices()
    total = 0
    for pet in @pets
      total += pet.price
    end
    return total
  end

  def find_pet_by_name(name)
    for pet in @pets
      if (pet.name == name)
        return pet
      end
    end
    return nil
  end

  def sell_pet(pet_name)
    pet = find_pet_by_name(pet_name)
    return @pets.delete(pet)
  end

end
