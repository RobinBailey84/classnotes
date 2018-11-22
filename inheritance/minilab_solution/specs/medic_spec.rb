require('minitest/autorun')
require('minitest/rg')
require_relative('../medic')

class TestMedic < MiniTest::Test

  def setup
    @medic = Medic.new("Victor", "McDade")
  end

  def test_medic_has_first_name
    assert_equal("Victor", @medic.first_name)
  end

  def test_medic_has_last_name
    assert_equal("McDade", @medic.last_name)
  end

  def test_medic_can_talk
    assert_equal("My name is Victor McDade", @medic.talk)
  end

  def test_medic_can_heal
    assert_equal("I can heal people", @medic.heal)
  end
end