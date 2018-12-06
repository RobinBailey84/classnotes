require_relative('../db/sql_runner.rb')
require_relative('./house.rb')

class Student

  attr_reader :house_id, :id
  attr_accessor :first_name, :last_name, :age

  def initialize(options)
    @id = options['id'].to_i if options['id']
    @first_name = options['first_name']
    @last_name = options['last_name']
    @house_id = options['house_id'].to_i()
    @age = options['age'].to_i()
  end

  def pretty_name()
    return "#{@first_name} #{@last_name}"
  end

  def save()
    sql = "INSERT INTO students (first_name, last_name, house_id, age) VALUES ($1, $2, $3, $4) RETURNING id"
    values = [@first_name, @last_name, @house_id, @age]
    result = SqlRunner.run(sql, values)
    @id = result[0]['id']
  end

  def update()
    sql = "UPDATE students SET (first_name, last_name, house_id, age) = ($1, $2, $3, $4) WHERE id = $5"
    values = [@first_name, @last_name, @house_id, @age, @id]
    SqlRunner.run(sql, values)
  end

  def self.delete_all()
    sql = "DELETE FROM students"
    SqlRunner.run(sql)
  end

  def delete()
    sql = "DELETE FROM students WHERE id = $1"
    values = [@id]
    SqlRunner.run(sql, values)
  end

  def self.all()
    sql = "SELECT * FROM students"
    results = SqlRunner.run(sql)
    students = results.map{|student_hash| Student.new(student_hash)}
    return students
  end

  def self.find(id)
    sql = "SELECT * FROM students WHERE id = $1"
    values = [id]
    student_hash = SqlRunner.run(sql, values).first()
    return Student.new(student_hash)
  end

  def house()
    sql = "SELECT * FROM houses WHERE id = $1"
    values = [@house_id]
    result = SqlRunner.run(sql, values)[0]
    return House.new(result)
  end
end
