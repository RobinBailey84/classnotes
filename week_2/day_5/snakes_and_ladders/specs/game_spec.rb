require("minitest/autorun")
require("minitest/rg")

require_relative("../game.rb")
require_relative("../counter.rb")
require_relative("../player.rb")
require_relative("../board.rb")
require_relative("../dice.rb")
require_relative("../modifier.rb")


class GameTest < MiniTest::Test

  def setup()
    @counter1 = Counter.new("Red")
    @counter2 = Counter.new("Yellow")
    @ladder = Modifier.new(6, 3)
    @snake = Modifier.new(43, -9)
    @board = Board.new(50, [@ladder, @snake])
    @player1 = Player.new("Upul", @counter1)
    @player2 = Player.new("Alistair", @counter2)
    @dice = Dice.new(6)
    @game = Game.new([@player1, @player2], @board, @dice)

  end


  def test_player_has_won()
    @player1.move_counter(50)
    result = @game.check_winner(@player1)
    assert_equal(true, result)
  end

  def test_game_won()
    @game.start_game()
    assert_equal(true, @game.is_won())
  end

  def test_snake_or_ladder
  @player1.move_counter(6)
  @game.check_landed_on_modifier(@player1)
  assert_equal(9, @player1.counter.position)
end

def test_can_take_turn()
    @game.take_turn(@player1)
    result = @player1.counter.position
    numbers = [1,2,3,4,5,6]
    assert_equal(true, numbers.include?(result))
  end

end
