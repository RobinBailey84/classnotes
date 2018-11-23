require("minitest/autorun")
require("minitest/rg")

require_relative("../modifier.rb")

class ModifierTest < MiniTest::Test

  def setup()
    @ladder = Modifier.new(3, 11)
    @snake = Modifier.new(20, -12)
  end

  def test_can_get_ladder_start_position()
    assert_equal(3, @ladder.start_position())
  end

  def test_can_get_ladder_spaces_to_travel()
    assert_equal(11, @ladder.spaces_to_travel())
  end

  def test_can_get_snake_spaces_to_travel()
    assert_equal(-12, @snake.spaces_to_travel())
  end

end
