"use strict";
var Hello = /** @class */ (function () {
    function Hello(person) {
        this.firstName = person.firstName;
        this.lastName = person.lastName;
    }
    Hello.prototype.sayHello = function () {
        console.log('hello: ' + this.firstName + this.lastName);
    };
    return Hello;
}());
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + lastName;
    }
    Student.prototype.sayHello = function () {
        console.log('hello: ' + this.firstName + this.lastName);
    };
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
greeter(user);
