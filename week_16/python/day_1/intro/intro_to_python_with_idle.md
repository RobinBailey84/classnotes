# Introduction to Python

**Duration: 20 minutes**

## Learning Objectives

- Understand the key features of Python, and where it is used
- Be aware of some of issues around Python 2 vs Python 3
- Be able to use IDLE as a REPL
- Be able to use IDLE to save and run a Python script

## Introduction

The Python programming language was created by the Dutch engineer Guido Van Rossum in the early 1990s. In contrast with other programming languages of that time, it was designed to be _fun_. This is reflected in the name of the language, which is named after Monty Python's Flying Circus - not the snake!

Python is a general purpose programming language; it is intended to be used to solve a wide variety of problems in computing, such as:

- Building desktop and web applications
- Solving scientific and statistical problems
- Providing scripting support for other software applications, particularly multimedia apps
- Artificial intelligence and data science

As a language, Python has a clear, readable syntax. Perhaps its most notable feature is its use of whitespace to denote blocks of code, rather than the curly brackets that you might see in other programming languages.

Its community places quite an emphasis on aesthetics. It's common to hear code being described as _Pythonic_ - this is code that meets the community's idea of how Python code should be. This philosophy is laid out in a document called [The Zen of Python](https://www.python.org/dev/peps/pep-0020/#id3).

## A short note about version numbers

In this course, we'll be using Python 3, as it is the current and future implementation of Python.

Unfortunately, many computers still come with Python 2 rather than Python 3. However, the content of this course has been written in such a way that it should work on either version of Python.

## IDLE

When Python is installed, it comes with a program known as IDLE: the <b>I</b>ntegrated <b>D</b>evelopment and <b>L</b>earning <b>E</b>nvironment.

There are many, many other ways of writing Python. It's common to use the terminal, and any number of text editors, or [development environments](https://wiki.python.org/moin/IntegratedDevelopmentEnvironments).

Having said that, IDLE provides a number of benefits:

- It is free
- It is cross-platform
- It provides an interactive Python Interpreter that will help us to write our code
- It provides syntax highlighting / colouring
- It has a built-in debugger to help us to fix bugs
- It is written in Python!

Let's open IDLE and take a look.

> Instructor note: Open Finder > Applications > IDLE 3
> This will only work after running `brew install python3 && brew linkapps`.

## Starting off

IDLE has two modes in which we can work.

The first is _Shell_ mode. In this mode, we can type single commands, which Python will interpret for us.

```python
>>> print("Hello World!")
Hello World!

>>> 1+1
2
```

When we start IDLE, we're presented with a shell window by default.

This is all well and good, but if we want to write more complex programs, we'll have to write more than one line of code. Fortunately IDLE has a second mode - _Editor_ mode - which will allow us to do this.

To enter this mode, we can press `⌘+n`. This will open a new editor window for us to write our program.

## Our first Python program

We're going to write and run a tiny program, just so that we can see how IDLE works.

```python
my_name = "John"
print(my_name)
```

To execute our program, we can select Run > Run Module, or press F5.

At this point, we're prompted to save our script. Choose a location, and a filename, and click save.

We should see the output from our script in the shell window.

## Conclusion

We've seen how to write and execute a small program using IDLE. Let's learn more about the Python language, starting with variables, and types.
