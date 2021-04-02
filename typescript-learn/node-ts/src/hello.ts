interface Person {
  firstName: string;
  lastName: string;
}

class Hello {
  firstName: string
  lastName: string
  constructor(person: Person) {
    this.firstName = person.firstName
    this.lastName = person.lastName
  }
  sayHello () {
    console.log('hello: ' + this.firstName + this.lastName)
  }
}

class Student {
  fullName: string;
  constructor(public firstName: string , public middleInitial: string, public lastName: string) {
    this.fullName = firstName + " " +middleInitial + lastName
  }
  sayHello () {
    console.log('hello: ' + this.firstName + this.lastName)
  }
}

function greeter(person : Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

greeter(user);