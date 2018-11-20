# Multiple Classes

### Learning Objectives

1. Be able to create multiple classes.
2. Be able to create a class with a collection of another class type.
3. Be able to create collections of different classes.

### Duration

2.5 hours

## Intro

Well done,  we have become object orientated programmers,  by creating a class and instantiating objects using it.

When object orientated programming becomes really powerful is when an object uses an other object to help it in a task.  Enough theory,  let's look at an example.

## Pet Shop - Pet class

Last week we had a pet shop that was a jumble of hashes and arrays.
Strictly speaking when we are trying to model something as complex as a pet shop, customer or pet these should be objects.

If we look at the dependencies of this, the pet shop has pets as part of it's structure. We would say then that the Pet Shop has a dependency on Pets. So we would need to create the Pet class first.

> Instructor notes - Hand out start point.

So we have our Pet class set up and tested. Now we need somewhere to store them.

Let's set up a pet shop test file.

In terminal:

```bash
#terminal

touch pet_shop.rb
touch specs/pet_shop_spec.rb
```
So when we set up our pet shop we will give it an array of pets to start off with.

So when we code our setup for the pet shop spec we will need to create some new instances of pets to be passed in.

> Instructor note: Copy and slack out the setup method so that students don't have to type out the 6 pets.

```ruby
# pet_shop_spec.rb

require("minitest/autorun")
require('minitest/rg')
require_relative("../instrument")

class PetShopTest < MiniTest::Test

  def setup
    @pet1 = Pet.new("Sir Percy", "Cat", "British Shorthair", 500)
    @pet2 = Pet.new("King Bagdemagus", "Cat", "British Shorthair", 500)
    @pet3 = Pet.new("Sir Lancelot", "Dog", "Pomsky", 1000)
    @pet4 = Pet.new("Arthur", "Dog", "Husky", 900)
    @pet5 = Pet.new("Tristan", "Cat", "Basset Hound", 800)
    @pet6 = Pet.new("Merlin", "Cat", "Egyptian Mau", 1500)

    @pets = [@pet1, @pet2, @pet3, @pet4, @pet5, @pet6]
  end

end
```
So we have our array of 6 pets now setup in our pet shop spec. So we should be able to take those pets and pass them to a new instance of a pet shop.

We will also give the pet shop a name.

```ruby
# pet_shop.rb
def setup
  @pet1 = Pet.new("Sir Percy", "Cat", "British Shorthair", 500)
  @pet2 = Pet.new("King Bagdemagus", "Cat", "British Shorthair", 500)
  @pet3 = Pet.new("Sir Lancelot", "Dog", "Pomsky", 1000)
  @pet4 = Pet.new("Arthur", "Dog", "Husky", 900)
  @pet5 = Pet.new("Tristan", "Cat", "Basset Hound", 800)
  @pet6 = Pet.new("Merlin", "Cat", "Egyptian Mau", 1500)

  @pets = [@pet1, @pet2, @pet3, @pet4, @pet5, @pet6]

  @pet_shop = PetShop.new("Camelot of Pets", @pets) // ADDED
end

```
[TASK:] - Write a test to check you can get the pet shop name back. Write the `PetShop` class to make the test pass.

Solution:

```Ruby
# pet_shop.rb

attr_reader :name

class PetShop

  def initialize(name, pets)
    @name = name
    @pets = pets
  end

end
```

Excellent our test now passes.

How will we check that the pets array has been set up properly?

> Discuss with students about returning a full Array vs returning the count of an Array.

We will write a method to return the pet count of the pet shop.

```ruby
# pet_shop.rb
def test_can_get_pet_count
  pet_count = @pet_shop.pet_count()
  assert_equal(6, pet_count)
end

```

[TASK:] Write the pet_count method to get the test passing.

Solution:

```Ruby
# pet_shop.rb

def pet_count()
  return @pets.size()
  # could use .count() or .length()
end
```

And lastly we will add a method to add a new pet to our pets array.
To do this we will need to create a new instance of a pet to add. As we are only doing this in one test we will create the instance inside the test. (If we were using a new pet in other tests we would move that to the setup method)

```Ruby
# pet_shop_spec.rb

def test_can_add_pet
  new_pet = Pet.new("Archie", "Dog", "Labrador", 600)
  @pet_shop.add_pet(new_pet)
  total_pets = @pet_shop.pet_count()
  assert_equal(7, total_pets)
end
```

[TASK:] Write the method in the pet shop class to add a new pet to the array.

Solution:

```Ruby
# pet_shop.rb

def add_pet(pet)
  @pets.push(pet)
end
```

Excellent so our pet shop is set up to have a name and an array of pets.

So how does this help us? Why is it good to have objects with other objects as properties?

Well we can now access properties of the pets inside the pet shop.

Let's imagine we wanted to write a function that would return us the total of all the pet prices in that pet shop?

We will start with a test.

```Ruby
# pet_shop_spec.rb

def test_can_get_total_of_pet_prices
  total = @pet_shop.get_total_of_pet_prices()
  assert_equal(5200, total)
end
```

And now we will write the method. In here we will loop over each pet in the array and access its price.

```ruby
# pet_shop.rb
class PetShop

  # AS BEFORE

  def get_total_of_pet_prices() #NEW
    total = 0
    for pet in @pets
      total += pet.price
    end
    return pet
  end

end

```

Excellent. We can access all of our pet details from the pet shop. This would also work if we wanted to access methods in the pet class as well.
