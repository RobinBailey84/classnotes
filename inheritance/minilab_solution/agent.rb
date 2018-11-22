require_relative('person')

class Agent < Person

  def talk
    return "The name's #{@last_name}, #{@first_name} #{@last_name}"
  end
end