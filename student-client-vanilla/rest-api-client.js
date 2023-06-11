export const fetchCodeBooks = async () => {
	let gender;
	let house;
	let year;
	const genderPromise = fetch("http://localhost:8080/codebooks/GENDER")
		.then((response) => response.json())
		.then((body) => {
			gender = body;
		});
	const housePromise = fetch("http://localhost:8080/codebooks/HOUSE")
		.then((response) => response.json())
		.then((body) => {
			house = body;
		});
	const yearPromise = fetch("http://localhost:8080/codebooks/YEAR")
		.then((response) => response.json())
		.then((body) => {
			year = body;
		});
	await Promise.all([genderPromise, housePromise, yearPromise]);
	return { gender, house, year };
};

export const fetchStudents = async () => {
	const response = await fetch("http://localhost:8080/students");
	const students = await response.json();
	return students;
};

export const fetchStudent = async (id) => {
	const response = await fetch(`http://localhost:8080/students/${id}`);
	const student = await response.json();
	return student;
};

export const updateStudent = async (student) => {
	await fetch(`http://localhost:8080/students/${student.id}`, {
		method: "PUT",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(student),
	});
};

export const createStudent = async (student) => {
	const response = await fetch("http://localhost:8080/students", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(student),
	});
	const id = await response.json();
	return id;
};

export const deleteStudent = async (id) => {
	await fetch(`http://localhost:8080/students/${id}`, { method: "DELETE" });
};
