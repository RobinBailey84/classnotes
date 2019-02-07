# Analysis and design part 1 test answers


## Question 1
Match the following data types to the examples of data that would be acceptable to that data type

| Data Type        | Example |
| ------------- |:-------------:|
| String     | 54321!!|
| Integer   | 12345|  
| Float| 12345.67 |
| Boolean| True|


## Question 2

Points:
 of 1	In Ruby, the following code uses which data structure? names = ["Ada", "Alan", "Doug"]

```
- Array
```
## Question 3
In Ruby, the following code uses which data structure? months = {"1" => "January", "2" => "February"}

```
- Hash
```
## Question 4
State the purpose of this algorithm, describe what it does and what will be returned when it is run:

```ruby
def find(array, value)
  for i in array
    return true if i == value
  end
  return false
end

puts find([7, 3, 6, 1, 0], 1)
```

```
This is a linear search algorithm. The function 'find' will take in an array and a value and assign them to the variables 'array' and 'value'.
The function will iterate through every item in the array and return 'true' if any of the items equals the value of the variable 'value'.
Otherwise it will return the value 'false'. The program will run the function 'find' with an array of [7,3,6,1,0] and a value '1'.
The function will return 'true'.
```
## Question 5
State the purpose of this algorithm, describe what it does and what will be returned when it is run:

```ruby
def valid_input?(word)
  illegal_characters = [" ", ":", ";", ","]

  illegal_characters.each do |c|
    return false if word.include? c
  end
  return true
end

puts valid_input?("hello")
puts valid_input?("he:llo")
puts valid_input?("hel lo")
puts valid_input?("hello")
```

```
This is an input validation algorithm.

The function valid_input? takes in a string and assigns it to the variable 'word'. The function sets up an array called illegal_characters with the values of a space and the symbols , ; and :

The function will loop through the illegal_characters array and for each item of the array it will check to see if it is included in the 'word' variable. If it is, the function returns the value 'false'.
Otherwise the function returns the value 'true'.

The program then calls the valid_input function four times with different strings of text and puts the result in the command line.
This should return true, false, false, true.
```

## Question 6
State the purpose of this algorithm, describe what it does and what will be returned when it is run:

```ruby
def max(a, b)
  a>b ? a : b
end

puts max(12, 42)
```

```
This is a find maximum algorithm.

The max function takes in two numbers (represented by the variables a and b). There is an if statement in the function. If 'a' is greater than 'b' then the function returns the value of 'a'.
Otherwise it returns the value of 'b'.

The program calls the max function with the values 12 and 42 and puts the value returned into the console window.

The console will display '42'.
```

## Question 7
State the purpose of this algorithm, describe what it does and what will be returned when it is run:

```ruby
def min(a, b)
  a<b ? a : b
end

puts min(12, 42)
```

```
This is a find minimum algorithm.

The min function takes in two numbers (represented by the variables a and b).
There is an if statement in the function.
If 'a' is less than 'b' then the function returns the value of 'a'. Otherwise it returns the value of 'b'.

The program calls the min function with the values 12 and 42 and puts the value returned into the console window.

The console will display '12'.
```

## Question 8
State the purpose of this algorithm, describe what it does and what will be returned when it is run:

```ruby
words = ["how", "much", "wood", "would", "a", "wood", "chuck", "chuck"]
counts = Hash.new(0)
words.each do |word|
  counts[word] += 1
end

puts counts

```

```
This is a count occurrences algorithm.

First, an array called 'words' is setup with the values "how", "much", "wood", "would", "a", "wood", "chuck", "chuck".
Next a new hash is setup called 'counts' with the initial value of 0. The each method iterates for each word in the 'words' array.
The program will add the word to the counts array as a key (if it isn't already there) and add one to the value.

The 'counts' hash is then returned to the console window.

This should display {"how"=>1, "much"=>1, "wood"=>2, "would"=>1, "a"=>1, "chuck"=>2}
```

## Question 9

Connect the programming constructs up with their definitions

| Construct        | Defenition |
| ------------- |:-------------:|
| Expression   | A combination of one or more explicit values, constants, variables, operators, and functions that the programming language interprets and computes to return another value. |
|Sequence  | Instructions executed one after another |  
| Selection| A question is asked, and depending on the answer, the program takes one of two courses of action|
| Iteration| The repetition of a block of statements within a computer program|
| Predefined function| A type of procedure or routine included in a programming language which carries out a mathematical calculation and returns a value|
| File handling	| Performing operations like open, create, modify, delete|  
