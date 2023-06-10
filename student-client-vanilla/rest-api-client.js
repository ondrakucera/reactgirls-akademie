const fetchCodeBooks = async () => {
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

const fetchStudents = async () => {
	const response = await fetch("http://localhost:8080/students");
	const students = await response.json();
	return students;
};

const fetchStudent = async (id) => {
	const response = await fetch(`http://localhost:8080/students/${id}`);
	const student = await response.json();
	return student;
};
