require('minitest/autorun')
require('minitest/rg')
require_relative('../customer.rb')
require_relative('../pet.rb')

class CustomerTest < MiniTest::Test

  def setup()
    @customer = Customer.new("Ally", 500)
  end

  def test_customer_name
    assert_equal("Ally", @customer.name)
  end

  def test_customer_cash
    assert_equal(500, @customer.cash)
  end

  def test_pets_start_empty
    pet_count = @customer.pet_count()
    assert_equal(0, pet_count)
  end

  def test_can_add_pet
    new_pet = Pet.new("Fluffy", "Dog", "Poodle", 1000)
    @customer.add_pet(new_pet)
    assert_equal(1, @customer.pet_count())
  end

end
