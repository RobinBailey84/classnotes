require('minitest/autorun')
require('minitest/rg')
require_relative('../bear')
require_relative('../fish')
require_relative('../river')

class BearTest < MiniTest::Test
  def setup
    @bear = Bear.new("Yogi", "Grizzly")
  end

  def test_bear_has_name
    assert_equal("Yogi", @bear.name)
  end

  def test_bear_has_type
    assert_equal("Grizzly", @bear.type)
  end

  def test_bear_has_empty_stomach
    count = @bear.count_stomach
    assert_equal(0, count)
  end

  def test_bear_can_add_fish_to_stomach
    fish = Fish.new("Nemo")
    @bear.eat_fish(fish)
    assert_equal(1, @bear.count_stomach)
  end

  def test_bear_can_take_fish_from_river
    # arrange
    fish = Fish.new("Nemo")
    river = River.new("Amazon", [fish])

    # act
    @bear.eat_from_river(river)

    # assert
    assert_equal(1, @bear.count_stomach())
    assert_equal(0, river.count_fishes())
  end

  def test_bear_can_roar
    assert_equal("ROAR!", @bear.roar())
  end
end
