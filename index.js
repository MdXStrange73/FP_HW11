class Student {
    constructor(name, marks) {
      this.name = name;
      this.marks = marks;
    }
  
    getAverageMark() {
      if (this.marks.length === 0) {
        return 0;
      }
  
      const sum = this.marks.reduce((total, mark) => total + mark, 0);
      return sum / this.marks.length;
    }
  
    getMarksSum() {
      return this.marks.reduce((total, mark) => total + mark, 0);
    }
  }
  
  class Group {
    #students = [];
  
    addStudent(student) {
      if (this.isStudent(student)) {
        this.#students.push(student);
      }
    }
  
    isStudent(student) {
      return student instanceof Student;
    }
  
    getAverageMark() {
      const totalAverage = this.#students.reduce(
        (sum, student) => sum + student.getAverageMark(),
        0
      );
      return totalAverage / this.#students.length;
    }
  
    getAverageMarksSum() {
      return this.#students.reduce(
        (sum, student) => sum + student.getMarksSum(),
        0
      );
    }
  
    get students() {
      return Object.freeze([...this.#students]);
    }
  }
  
  const group = new Group();
  
  group.addStudent(new Student('John', [10, 8])); // средний балл = 9
  group.addStudent(new Student('Alex', [10, 9])); // средний балл = 9.5
  group.addStudent(new Student('Bob', [6, 10])); // средний балл = 8
  
  console.log(group.students.length === 3);
  group.addStudent({}); // игнорируем добавление невалидных данных
  console.log(group.students.length === 3);
  
  // Выводим средний балл группы
  console.log(group.getAverageMark() === (9 + 9.5 + 8) / 3);
  
  group.students = [new Student('John', [10, 10, 5, 10])]; // Ошибка: Cannot set property students of #<Group> which has only a getter
  console.log(group.students.length === 3);