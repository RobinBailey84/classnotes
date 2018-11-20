require('minitest/autorun')
require('minitest/rg')
require_relative('../customer.rb')
require_relative('../pet.rb')
require_relative('../pet_shop.rb')

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

  def test_customer_buy_pet()
    pet = Pet.new("Arthur", "Dog", "Husky", 400)
    shop = PetShop.new("Alis fish emporium", 500, [pet])
    @customer.buy_pet(shop, "Arthur")
    assert_equal(1, @customer.pet_count())
    assert_equal(0, shop.pet_count())
  end

end
