require('minitest/autorun')
require('minitest/rg')
require_relative('../person')

class TestPerson < MiniTest::Test

  def setup
    @person = Person.new("Jack", "Jarvis")
  end

  def test_person_has_first_name
    assert_equal("Jack", @person.first_name)
  end

  def test_person_has_last_name
    assert_equal("Jarvis", @person.last_name)
  end

  def test_person_can_talk
    assert_equal("My name is Jack Jarvis", @person.talk)
  end
end