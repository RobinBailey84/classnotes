# Spring Data REST with custom Queries

**Lesson Duration: 30 minutes**

### Learning Objectives
- Be able to build robust REST APIs that make use of Spring Data REST as well as custom queries


# Introduction
**Why are we learning this?** A higher level of API sophistication is easily achievable by combining Spring Data REST for all CRUD and and RESTful endpoint construction along with carefully planned custom endpoints which use custom queries.

**What problem are we trying to solve?** **By the end of this lesson you will be able to**

By the end of the lesson we will be able to connect custom endpoints not already created for us with Spring Data REST into custom queries written with Criteria Queries.


**Let's connect the `findShipsThatHavePiratesNamed(String firstName)` query to a route to improve the functionality of our pirate service.**

##  Custom Routes

Looking into `ShipController` no endpoints yet. We will now add a custom route. Remember, the others are generated for us with Spring Data REST.


Let's create a route that doesn't step on the ones generated for us, but also provides functionality. We should create a route on `/pirates/named/{name}` in the `ShipController` to give us the pirates for that `name`.

We can create that route however we like, as long as it doesn't clash with a Spring Data Rest route, and as long as it makes sense.

We will take the age from the path as a variable using the `@PathVariable` annotation which works as follows:

```java
//ShipController.java

 @GetMapping(value = "/pirates/{name}")
 public List<Ship> findShipsThatHavePiratesNamed( @PathVariable String name){
      return shipRepository.findShipsThatHavePiratesNamed(name);
 }
```

`@PathVariable` makes the annotated variable's value that of the one provided in `{age}`. We can then simply pass the age into our already created custom query.

The HTTP Request can now be made to `/ships/pirates/named/<name>` to give us the `Ship`s we want.

Test by going to: [http://localhost:8080/ships/pirates/named/John](http://localhost:8080/ships/pirates/named/John)

> TASK (10 mins)
> 
> Create a custom route for the `findRaidByLocation(String location);` query   (we created previously in `RaidRepository`). 
> 
> * Decide on a suitable route that doesn't clash with SDR routes
> * Create this custom route in `RaidController.java`
> * Test it in the browser or Insomia
> * Be careful with the case of the name.

## Solution

```java
//RaidController.java

// Available on: 
// http://localhost:8080/raids/location/Tortuga
@GetMapping("/location/{location}")
public List<Raid> findRaidByLocation(@PathVariable String location){
    return raidRepository.findRaidByLocation(location);
}

```

* **Q: How can we deal with the case?**
* **A: Write a query that ignores the case** or **convert the case when saving to the database**


# Summary
* We can now connect our custom queries, to our custom routes and let Spring Data Rest handle the standard REST routes.