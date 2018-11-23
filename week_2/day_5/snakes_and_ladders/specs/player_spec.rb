require("minitest/autorun")
require("minitest/rg")

require_relative("../player.rb")
require_relative("../counter.rb")
require_relative("../dice.rb")

class PlayerTest < MiniTest::Test

  def setup()
    @counter = Counter.new("Red")
    @player = Player.new("Upul", @counter)
  end

  def test_has_name()
    assert_equal("Upul", @player.name())
  end

  def test_has_counter()
    assert_equal("Red", @player.counter().colour())
  end

  def test_can_roll_dice()
    dice = Dice.new(6)
    result = @player.roll_dice(dice)
    numbers = [1,2,3,4,5,6]
    assert_equal(true, numbers.include?(result))
  end

  def test_move_counter()
    @player.move_counter(6)
    assert_equal(6, @player.counter().position())
  end

end
