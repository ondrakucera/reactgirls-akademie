/**
 * Creates a new student.
 *
 * @param {number|null} id the ID
 * @param {string} firstName the first name
 * @param {string} lastName the last name
 * @param {string} year the year
 * @constructor
 */
const Student = function (id, firstName, lastName, year) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.year = year;
};

module.exports = Student;
