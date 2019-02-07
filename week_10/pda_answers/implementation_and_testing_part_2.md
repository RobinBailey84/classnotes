# Analysis and design part 1 test answers


## Question 1
Match the following software testing methods to the descriptions of those testing methods

| Method       | Description |
| ------------- |:-------------:|
| Static testing |A software testing method that involves examination of the program's code and its associated documentation but does not require the program be executed|
| Dynamic testing   |A software testing method that involves interaction with the program while it runs|  
| White Box testing| A software testing method that examines the program structure and derives test data from the program logic/code|
| Black Box testing| A software testing method that examines the functionality of an application without peering into its internal structures or workings|


## Question 2

Match the following software testing levels to the descriptions of those testing levels

| Level       | Description |
| ------------- |:-------------:|
| Unit testing |The smallest testable parts of an application are individually and independently scrutinised for proper operation. This is often automated but it can also be done manually.|
| Integration testing   |Individual software modules are combined and tested as a group|  
| Component testing| Testing of specific module or program. It may be done in isolation from rest of the system|
| System testing|Testing conducted on a complete, integrated product to evaluate it's compliance with specified requirements|

## Question 3
A program has been designed to store five scores between 1 and 100. All of the scores are held as integers. Give an example of **normal** data that could be used to test the program.

```
1, 15, 27, 42, 98
```

## Question 4
A program has been designed to store five scores between 1 and 100. All of the scores are held as integers. Give an example of **extreme data** that could be used to test the program.

```
0, 100
```

## Question 5
A program has been designed to store five scores between 1 and 100. All of the scores are held as integers. Give an example of exceptional data that could be used to test the program.

```
three, 65%, tangerine, 42.9, -83
```

## Question 6
Match the following debugging techniques to the descriptions of those techniques

| Technique       | Description |
| ------------- |:-------------:|
| Dry runs |The process of a programmer manually working through their code to track the value of variables. There is no software involved in this process.|
| Walkthroughs  |A form of software peer review in which a designer or programmer leads members of the development team and other interested parties through a software product, and the participants ask questions and make comments about possible errors, violation of development standards, and other problems|  
|Breakpoints| A point in the program where the code will stop executing|
| Trace Tables| Used to allow programmers to track the value of variables as each line of code is executed. The values of the variables are logged and assist the programmer in identifying any potential errors.|

## Question 7
Give an example of a syntax error that you might find in a program

```
A spelling error in a variable name, forgetting quote marks or mixing ' with ", missing commas or semi-colons
```

## Question 8
Give an example of an execution error that you might find in a program

```
Trying to divide by zero or access an item in an array that doesn't exist
```

## Question 9

Give an example of a logic error that you might find in a program

```
Using < instead of > or <= Using AND instead of OR
```

## Question 10
Give an example of a meaningful identifier for a variable or function

```
Using the variable name date_of_birth to store someone's birthday
```

## Question 11
Give an advantage of using meaningful identifiers for variables or functions


```
It means the program is easier to read and understand; to reduce the effort needed to read and understand the code; to provide better understanding in case of code reuse after a long interval of time.
```

## Question 12
Give an advantage of using indentation


```
The program is easier to read and spot errors such as missing brackets.
```

## Question 13
Give an advantage of using internal commentary

```
Having internal commentary makes it easier to see what is going on in your program. If you are looking at someone else's code, it can save you time having to work out what each line of code is doing.
```

## Question 14
Match the following programming paradigms to the descriptions of those paradigms

| Paradigm       | Description |
| ------------- |:-------------:|
| Procedural programming | Composed of one or more modules. Each module is composed of one or more subprograms. Modules may consist of functions, subroutines or methods, depending on the programming language.|
| Event-driven programming  |A programming paradigm in which the flow of the program is determined by unpredictable occurrences such as mouse clicks, key presses, sensor outputs, or messages from other programs/threads.|  
|Object-oriented programming	| A type of computer programming in which programmers define not only the data type of a data structure, but also the types of operations (functions) that can be applied to the data structure.|
