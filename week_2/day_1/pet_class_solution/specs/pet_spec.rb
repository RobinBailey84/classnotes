require('minitest/autorun')
require('minitest/rg')
require_relative('../pet.rb')

class PetTest < MiniTest::Test

  def setup()
    @pet = Pet.new("Fluffy", "Cat", "British Shorthair", 100)
  end

  def test_pet_has_name()
    assert_equal("Fluffy", @pet.name())
  end

  def test_pet_has_type()
    assert_equal("Cat", @pet.type())
  end

  def test_pet_has_breed()
    assert_equal("British Shorthair", @pet.breed())
  end

  def test_pet_has_price()
    assert_equal(100, @pet.price())
  end

  def test_can_set_pet_name()
    @pet.name = "Mr Tiddles"
    assert_equal("Mr Tiddles", @pet.name())
  end

  def test_can_set_pet_type()
    @pet.type = "Dog"
    assert_equal("Dog", @pet.type())
  end

  def test_can_set_pet_breed()
    @pet.breed = "Tabby"
    assert_equal("Tabby", @pet.breed())
  end

  def test_can_set_pet_price()
    @pet.price = 200
    assert_equal(200, @pet.price())
  end

  def test_pet_can_speak_cat()
    assert_equal("Meow", @pet.speak())
  end

  def test_pet_can_speak_dog()
    @pet2 = Pet.new("Scooby", "Dog", "Husky", 300)
    assert_equal("Woof", @pet2.speak())
  end

end
