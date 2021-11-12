const express = require("express");
const cors = require("cors");

const Student = require("./student");
const studentDao = require("./student-dao");

const app = express();
app.use(express.json());
app.use(cors());

const port = 8080;

// Get all students
app.get("/students", (request, response) => {
	response.send(studentDao.findAll());
});

// Create a new student
app.post("/students", (request, response) => {
	/** @type {{firstName: string, lastName: string, gender:string, house:string, year: string}} */
	const studentDto = request.body;
	const student = studentDao.save(
		new Student(null, studentDto.firstName, studentDto.lastName, studentDto.gender, studentDto.house, studentDto.year)
	);
	response.send(200, student.id);
});

// Get a student
app.get("/students/:id", (request, response, next) => {
	const student = studentDao.findById(Number(request.params.id));
	if (student) {
		response.send(student);
	} else {
		next();
	}
});

// Update a student
app.put("/students/:id", (request, response, next) => {
	/** @type {{firstName: string, lastName: string, gender:string, house:string, year: string}} */
	const studentDto = request.body;
	try {
		studentDao.save(
			new Student(
				Number(request.params.id),
				studentDto.firstName,
				studentDto.lastName,
				studentDto.gender,
				studentDto.house,
				studentDto.year
			)
		);
		response.status(204).send();
	} catch (e) {
		next();
	}
});

// Delete a student
app.delete("/students/:id", (request, response, next) => {
	try {
		studentDao.deleteById(Number(request.params.id));
		response.status(204).send();
	} catch (e) {
		next();
	}
});

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
app.use((error, request, response, next) => {
	// whatever you want here, feel free to populate
	// properties on `err` to treat it differently in here.
	response.status(error.status || 500);
	response.send({ error: error.message });
});

// our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use((request, response) => {
	response.status(404);
	response.send({ error: "Not found." });
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
