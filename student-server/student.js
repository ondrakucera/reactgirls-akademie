/**
 * Creates a new student.
 *
 * @param {number|null} id the ID
 * @param {string} firstName the first name
 * @param {string} lastName the last name
 * @constructor
 */
const Student = function (id, firstName, lastName) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
};

module.exports = Student;
