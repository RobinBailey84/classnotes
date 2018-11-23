require ("minitest/autorun")
require ("minitest/rg")

require_relative("../dice.rb")

class DiceTest < MiniTest::Test

  def setup()
    @dice = Dice.new(6)
  end

  def test_has_6_sides()
    assert_equal(6, @dice.sides())
  end

  def test_can_roll()
    result = @dice.roll()
    numbers = [1,2,3,4,5,6]
    assert_equal(true, numbers.include?(result))
  end

end
