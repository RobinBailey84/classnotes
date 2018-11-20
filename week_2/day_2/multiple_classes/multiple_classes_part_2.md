# Multiple Classes

### Learning Objectives

1. Be able to pass objects between classes.

### Duration

1 hour

## Pet Shop - Pet class

> instructor note: Hand out start point if needed.

So now we have a customer that is able to add a pet.

We also now have a `find_pet_by_name` method in the pet shop.

We need now to think about interaction between the customer and the pet shop.

Let's think about what should happen when a customer wants to buy a pet...

Who starts the interaction?

Well the customer should really start this interaction as the customer would go to the pet shop and ask to buy a pet.

What does the customer need to know?

The customer would need to know which pet shop and which pet they want?

So we will start off by writing a `buy_pet` method in customer.

Write the test first. In order for this to work we will need a pet shop and a pet to be bought.

We will need to create the pet first in order to pass to the pet shop.


Remember to `require_relative` the `pet_shop.rb` file as well.

```Ruby
# customer_spec.rb
require_relative('../pet_shop.rb')

# AS BEFORE

def test_customer_can_buy_pet()
  pet = Pet.new("Arthur", "Dog", "Husky", "400")
  shop = PetShop.new("Camelot of pets", 1000, [pet])
end

```

Next we will call the customers `buy_pet` method. We will pass this the name of the pet they want and the shop to be bought from.

```Ruby
# customer_spec.rb
def test_customer_can_buy_pet()
  pet = Pet.new("Arthur", "Dog", "Husky", "400")
  shop = PetShop.new("Camelot of pets", 1000, [pet])
  @customer.buy_pet(shop, "Arthur") # ADDED
end

```

So how will we know if this works?

Well let's think about what should happen. If the customer buys a pet they should now have one pet in their pets array.

Similarly if the pet shop sells a pet then that pet should be removed from its pets array.

```Ruby
# customer_spec.rb
def test_customer_can_buy_pet()
  pet = Pet.new("Arthur", "Dog", "Husky", "400")
  shop = PetShop.new("Camelot of pets", 1000, [pet])
  @customer.buy_pet(shop, "Arthur")
  assert_equal(1, @customer.pet_count())
  assert_equal(0, shop.pet_count())
end

```

OK so our test is set up lets look at getting it passing.

> Note we will not concern ourselves with cash at this point. We just want to get the pet from the pet shop to the customer.

We will start in the customer class and write the `buy_pet` method.


```ruby
# customer.rb

def buy_pet(shop, pet_name)

end
```

In here we need to ask ourselves how will the customer get this pet?

Again thinking in real life terms the pet shop should pass the pet over to the customer.

So the customer would ask the shop for a pet and the shop would give the customer the pet. (Again for now ignoring if pet exists... we will assume it does.)

So in order to do this we will need a method in the pet shop class that will return a pet that has been requested and remove it from the pet shop array.

We will write a `sell_pet` method in pet shop. This will take in the name of pet and return that pet from the array. The arrays delete method will do this for us.

We will also test this.

```ruby
# pet_shop_spec

def test_shop_can_sell_pet
  pet = @pet_shop.sell_pet("Arthur")
  assert_equal("Arthur", pet.name)
end
```

And write the function to pass the test.

```ruby
# pet_shop.rb
def sell_pet(pet_name)
  pet = find_pet_by_name(pet_name)
  return @pets.delete(pet)
end
```

OK great so we can get our pet back.

Lets call this from the customer and get the pet we want. Then we will add that pet to the pets array of the customer.

```ruby
#customer.rb

def buy_pet(shop, pet_name)
  pet = shop.sell_pet(pet_name)
  @pets.push(pet)
end  

```

If we run the test in the customer_spec now it should be passing.  

### Recap

So when we want to pass an object from one class to another we need to figure out which class should request the object. The other class should then be responsible for returning the requested object.

This is a difficult concept to figure out and it is not always clear which class should do which. But with practice you should be able to make good judgement calls.
