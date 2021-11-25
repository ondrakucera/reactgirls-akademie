const express = require("express");
const cors = require("cors");

const CodebookItem = require("./codebook");
const Student = require("./student");
const studentDao = require("./student-dao");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT ?? 8080;

const codebooks = createCodebooks();
persistSampleStudents();

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

// Get a codebook
app.get("/codebooks/:codebookCode", (request, response) => {
	const codebook = codebooks[request.params.codebookCode] ?? [];
	response.send(codebook);
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

function persistSampleStudents() {
	studentDao.save(new Student(null, "Harry", "Potter", "M", "GRYFFINDOR", "2"));
	studentDao.save(new Student(null, "Hermione", "Granger", "F", "GRYFFINDOR", "2"));
	studentDao.save(new Student(null, "Ron", "Weasley", "M", "GRYFFINDOR", "2"));
	studentDao.save(new Student(null, "Ginny", "Weasley", "F", "GRYFFINDOR", "1"));
	studentDao.save(new Student(null, "Luna", "Lovegood", "F", "RAVENCLAW", "1"));
	studentDao.save(new Student(null, "Draco", "Malfoy", "M", "SLYTHERIN", "2"));
}

function createCodebooks() {
	return {
		GENDER: [
			new CodebookItem("M", { cs: "Muž", en: "Male" }, 1),
			new CodebookItem("F", { cs: "Žena", en: "Femail" }, 2),
		],
		HOUSE: [
			new CodebookItem("GRYFFINDOR", { cs: "Nebelvír", en: "Gryffindor" }, 1),
			new CodebookItem("HUFFLEPUFF", { cs: "Mrzimor", en: "Hufflepuff" }, 2),
			new CodebookItem("RAVENCLAW", { cs: "Havraspár", en: "Ravenclaw" }, 3),
			new CodebookItem("SLYTHERIN", { cs: "Zmijozel", en: "Slytherin" }, 4),
		],
		YEAR: [
			new CodebookItem("1", { cs: "První", en: "First" }, 1),
			new CodebookItem("2", { cs: "Druhý", en: "Second" }, 2),
			new CodebookItem("3", { cs: "Třetí", en: "Third" }, 2),
			new CodebookItem("4", { cs: "Čtvrtý", en: "Fourth" }, 2),
			new CodebookItem("5", { cs: "Pátý", en: "Fifth" }, 2),
			new CodebookItem("6", { cs: "Šestý", en: "Sixth" }, 2),
			new CodebookItem("7", { cs: "Sedmý", en: "Seventh" }, 2),
		],
	};
}
