require('minitest/autorun')
require('minitest/rg')
require_relative('../river')
require_relative('../fish')

class RiverTest < MiniTest::Test
  def setup
    fish1 = Fish.new("Nemo")
    fish2 = Fish.new("Upul")
    fish3 = Fish.new("Debi")

    fishes = [fish1, fish2, fish3]

    @river = River.new("Amazon", fishes)
  end

  def test_river_has_name
    assert_equal("Amazon", @river.name)
  end

  def test_river_has_fishes
    count = @river.count_fishes
    assert_equal(3, count)
  end

  def test_river_can_remove_fish
    @river.remove_fish
    assert_equal(2, @river.count_fishes)
  end
end
