# Advanced Queries - Criteria Queries
**Lesson Duration: 45 minutes**

### Learning Objectives

- Be able to build advanced queries that can work across related models



# Introduction
In some cases, we will need to make a query that needs data from more than one related model. Luckily, we can use criteria queries with the alias feature to create queries that allow us to access related models to get the data we want.



## Building A Criteria Query

Lets put together a query to get the Ships for a pirate with a given name.








###  Use the relationships 
Put together a plan based on your knowledge of the relationships. Relational databases are good becuase the relation helps you get the data.

![../images/pirates_ships_raids.png](../images/pirates_ships_raids.png)



Make use of that data we already **have** then find the shortest route to the data we're **trying to find**.
For our query we can identify:

To get all `Ship`s that have a `Pirate` with a given name:

- **Already have:** `Pirate`'s first name
- **Want back:** list of Ships that have pirates with that name. _This means on the query we will have a start point on the `Ship` model._




### Obtain the EntityManager
In standard Java Persistence libraries which we are using `javax.persistence`, there is an EntityMangager responsible for giving access to the Models (our annotated classes). This `EntityManager` can give us access to the Hibernate `Session` object, which simply allows us to read and write to the database.

Spring makes obtaining the `EntityManager` relatively simple by allowing it to be dependency injected.

We can do this in our `ShipRepositoryImpl` class:
 
```java
//ShipRepositoryImpl.java

   @Autowired
   EntityManager entityManager;
```

### Obtain the Hibernate Session 
Using the `entityManager`, which is a standard Javax persistence class, we can ask it to give us an instance of a class from the provider-specific API. In our case this provider-specific API is Hibernate, and we want to get hold of the `Session` to do criteria queries.  So we do:

```java
//ShipRepositoryImpl.java

public List<Ship> findShipsThatHavePiratesNamed(String firstName) {
	List<Ship> result = null; // NEW
  	Session session = entityManager.unwrap(Session.class);  // NEW
   
   
    return result; // NEW
}
```
> Note: `Session` from `org.hibernate` is the one we want when importing the class in IntelliJ.

`unwrap()` asks JPA to give us Hibernate's `Session`.

### Create a new Criteria

**Hibernate** allows us to create a `Criteria` object that we can use to construct a query in code.

A `Criteria` needs to be created on a particular model class, so it knows how to query it and where to begin. 

**We are querying to get back instances of Ship, so our Criteria needs to be created "on" the Ship class**. Think of this as the equivalent SQL: `SELECT <something> FROM ships` 

We use the "session" to create a new `Criteria` object. 

```java
//ShipRepositoryImpl.java

@Autowired
EntityManager entityManager;
 
List<Ship> findShipsThatHavePiratesNamed(String firstName) {
	List<Ship> result = null;

	Session session = entityManager.unwrap(Session.class);
	Criteria cr = session.createCriteria(Ship.class); //NEW


	return result;
}

```


### Restrictions

Now that we have a `Criteria` `cr`, it's possible to add various `Restrictions` to the criteria.

For example, if we were to check `Ship` has name `"Cutty Sark"`:

```java
// Example Code 
Criteria cr = session.createCriteria(Ship.class);
cr.add(Restrictions.eq("name", "Cutty Sark"));
```

A Restriction on the criteria is much the same as using another condition in an SQL statement like:

```sql
// Example code
SELECT * FROM raids
WHERE condition1
AND condition2
AND condition3
```

Just like in SQL, we can add as many conditions or restrictions as we wish. It's simply a matter of adding more `cr.add();` calls containing restrictions.

Restrictions have many methods to allow us to compare properties of a model when building a query. For example

- To get records having age **eq**ual to 30

```java
cr.add(Restrictions.eq("age", 25));
```

- To get records having age more than 25

```java
cr.add(Restrictions.gt("age", 25));
```

- To get records having age less than 25

```java
cr.add(Restrictions.lt("age", 25));
```

- To get records having fistName starting with jac

```java
cr.add(Restrictions.like("firstName", "jac%"));
```

- Case sensitive form of the above restriction.

```java
cr.add(Restrictions.ilike("firstName", "Jac%"));
```

- To get records having age in between 25 and 35

```java
cr.add(Restrictions.between("age", 25, 35));
```

A full list is available on the [Hibernate documentation](https://docs.jboss.org/hibernate/core/3.3/api/org/hibernate/criterion/Restrictions.html).

**NOTE**: Most of these basic queries are able to be completed using Spring JPA Query Methods!

-----

### Aliases


**However, for our purposes** we need to query `Ship` and the `Pirate` related to it, to check the pirates first name and give us `Ship` objects who have pirates with that first name we're giving.

We will add an alias to our `Criteria` object that will allow us to traverse across related classes.

Once we have used the alias to get hold of `Pirate`, we will use a normal `Restriction` to check it has the name we're after.

```java
//ShipRepositoryImpl.java


@Autowired
EntityManager entityManager;
 
List<Ship> findShipsThatHavePiratesNamed(String firstName) {
	List<Ship> result = null; // NEW

	Session session = entityManager.unwrap(Session.class);
    Criteria cr = session.createCriteria(Ship.class);
    cr.createAlias("pirates", "pirateAlias");           // NEW
    cr.add(Restrictions.eq("pirateAlias.firstName", firstName)); // NEW
	
	return result;
}

```

Here we create an alias on the `pirates` list in the `Ship` called `pirateAlias`. This `pirateAlias` can be seen as allowing us to access the `Pirate` properties.

Imagine the alias is like a variable created for a loop body that represents one element of the structure being looped over. Much like the varible `item` in:
 `for (String item: items){ }`.



### Get Query Result

As with the method, the query result depends on whether we are getting back a scalar (one unique result) or a vector (a list of results).

#### Unique result
The `Criteria` object `cr` has a `uniqueResult()` method which does just that. `uniqueResult()` returns an object of type `Object` meaning we need to remember to cast it to the type we want.

```java
result = (Ship)cr.uniqueResult();
```

#### Non-unique Result

The `Criteria` object `cr` has a `list()` method which gives a `List<>` of our objects

```
   results = cr.list();
```

**In our case**, we've already decided it's a `List` of `Ship` we want back, so use `cr.list()`

```java
//ShipRepositoryImpl.java


@Autowired
EntityManager entityManager;

  public List<Ship> findShipsThatHavePiratesNamed(String firstName){
        List<Ship> result = null;
        Session session = entityManager.unwrap(Session.class);
        Criteria cr = session.createCriteria(Ship.class);
        cr.createAlias("pirates", "pirateAlias");
        cr.add(Restrictions.eq("pirateAlias.firstName", firstName));
        result = cr.list();  // NEW
        return result;
   }
```

Now write a test for the query and check the result in the debugger.

### Make method impl' available

We now need to add the method prototype for the new custom query to the interface, so instances of `ShipRepository` can call it.

```java
//ShipRepositoryCustom.java

public interface ShipRepositoryCustom {   // AS BEFORE
    List<Ship> findShipsThatHavePiratesNamed(String firstName);  //NEW
} // AS BEFORE
```

We don't need to, but it's good to add it to `ShipRepository`, too:

```java
//ShipRepository.java

@Repository
public interface ShipRepository extends JpaRepository<Ship, Long>, ShipRepositoryCustom  { // AS BEFORE
    List<Ship> findShipsThatHavePiratesNamed(String firstName); // NEW
} // AS BEFORE 
```

### Transactional

We need to mark the `findShipsThatHavePiratesNamed` implementation as `@Transactional`. This simply tells Spring that this method will be used to enact database transactions.


```java
//ShipRepositoryImpl.java

@Transactional       // NEW
public List<Ship> findShipsThatHavePiratesNamed(String firstName){    // AS BEFORE
    List<Ship> result = null;     // AS BEFORE
        
```

### Catching Errors

Most databases run on a separate process entirely from the application that's using it either on the same computer, or separate computers that are networked together. 
![../images/database_connection_1.png](../images/database_connection_1.png)
The left side represents the `PirateserviceApplication` running on the same computer as the postgresql database. On the right, they are running on different computers.

**In both situations** because we need to connect to the database, the database itself is external to the application. Ultimately this means that databases should be treated the same way that all "I/O" is treated in computing.


#### What is I/O?
**I/O** is short for input and output. In computing terms, it means when data is read and written to an external resource outside of the application or to the outside world.

What's external:

* Users
* Hardware devices like Monitors, Keyboards, Mice, Disk drives, Wifi/Network cards
* Other programs and software

Reading and writing to I/O is an extremly important part of computing that's taken for granted. Importantly it's the bottleneck that's **most likely to have something go wrong.** And even more notably, **it's our responsibility to handle cases of I/O going wrong**.

#### Handling problems with try / catch / finally
Most programming languages have a mechanisim for handling situations (commonly with I/O) that might go wrong. This is through the `try` + `catch` system.

In Java `try` and `catch` are keywords built into the language. `try` allows us to encapsulate a block of code that we believe to have a risk of not working correctly because of some external factor like  the I/O device being disconnected or not being available. 

```java
try {
// Code in here is risky or is not gaurenteed to work
}
```

The `catch` keyword needs to come immediately after the try block. `catch` means if things definately do go wrong from the `try` block for whatever reason, then execute the code in the `catch` block.
More technically, `catch` "catches" an `Exception` if one is created when doing the actions of the `try`, and we can gain access to that `Exception` in the catch block by passing it in.

```java
..
catch (Exception ex) {

}
```

In situations where we want to say "no matter what happens, always do the following", then we can also use a `finally` block.

Putting it all together we have:

```java

try {
// Call something that's at risk of not working - like an I/O read or write
} catch (Excepton ex) {
// The read or write didn't go as planned and 'threw' an exception. 
// We now have access to the ex object to tell us more about what went wrong
} finally {
// If it all goes well, or if it all goes badly, no matter what, call the finally. Finally is optional.
}
```


## Try / catch in our query

Since we are using the hibernate `Session` object to indirectly access the database and this is an I/O operation, this should be protected with `try`/`catch`. The `finally` block should be used to close the session.

For our query, we now have:

```java
//ShipRepositoryImpl.java

@Autowired
EntityManager entityManager;
 
  @Transactional
    public List<Ship> findShipsThatHavePiratesNamed(String firstName){
        List<Ship> result = null;
        Session session = entityManager.unwrap(Session.class);
        try{
            Criteria cr = session.createCriteria(Ship.class);
            cr.createAlias("pirates", "pirateAlias");
            cr.add(Restrictions.eq("pirateAlias.firstName", firstName));
            result = cr.list();
        }
        catch (HibernateException ex){
            ex.printStackTrace();;
        }
        return result;
    }
```
The `findShipsThatHavePiratesNamed(String firstName)` method can now be used anywhere we've injected a `PirateRepository`.


# Summary

- We now know build criteria queries
- We learned how to use aliases in criteria queries to do queries across related classes
