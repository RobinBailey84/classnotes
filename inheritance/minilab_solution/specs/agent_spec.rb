require('minitest/autorun')
require('minitest/rg')
require_relative('../agent')

class TestAgent < MiniTest::Test

  def setup
    @agent = Agent.new("Brooke", "Bond")
  end

  def test_agent_has_first_name
    assert_equal("Brooke", @agent.first_name)
  end

  def test_agent_has_last_name
    assert_equal("Bond", @agent.last_name)
  end

  def test_agent_can_talk
    assert_equal("The name's Bond, Brooke Bond", @agent.talk)
  end
end