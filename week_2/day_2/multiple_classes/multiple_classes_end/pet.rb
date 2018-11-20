class Pet

  attr_accessor :name, :type, :breed, :price

  def initialize(name, type, breed, price)
    @name = name
    @type = type
    @breed = breed
    @price = price
  end

  def speak()
    return "Woof" if(@type == "Dog")
    return "Meow" if (@type == "Cat")
  end
end
