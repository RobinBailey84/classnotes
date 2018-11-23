class Game

  attr_reader :is_won
  
  def initialize(players, board, dice)
    @players = players
    @board = board
    @dice = dice
    @is_won = false
  end

  def check_winner(player)
    @is_won =  player.counter().position() >= @board.number_of_squares()
    return @is_won
  end

  def take_turn(player)
    move = player.roll_dice(@dice)
    player.move_counter(move)
  end

  def check_landed_on_modifier(player)
    move = @board.check_snake_or_ladder(player.counter.position)
    player.move_counter(move)
  end

  def start_game()
    while(!@is_won) do
      take_turn(@players[0])
      check_landed_on_modifier(@players[0])
      check_winner(@players[0])
      @players.rotate()
    end
  end


end
