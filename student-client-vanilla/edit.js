const handleSubmit = async (event, id) => {
	event.preventDefault();

	const form = event.target;

	const firstName = document.querySelector("#first-name").value;
	const lastName = document.querySelector("#last-name").value;
	const gender = form["gender"].value;
	const house = document.querySelector("#house").value;
	const year = document.querySelector("#year").value;
	const student = { id, firstName, lastName, gender, house, year };

	await updateStudent(student);

	location.href = `detail.html?id=${id}`;
};

const renderEditFormContent = (student, codeBooks) => {
	const tableString = `
		<table>
			<tr>
				<th>
					<label for="first-name">First name</label>
				</th>
				<td>
					<input id="first-name" value="${student.firstName}">
				</td>
			</tr>
			<tr>
				<th>
					<label for="last-name">Last name</label>
				</th>
				<td>
					<input id="last-name" value="${student.lastName}">
				</td>
			</tr>
			<tr>
				<th>Gender</th>
				<td>${getCodeBookRadioButtonsString(codeBooks, "gender", LANGUAGE, student.gender)}</td>
			</tr>
			<tr>
				<th>
					<label for="house">House</label>
				</th>
				<td>
					<select id="house">${getCodeBookOptionsString(codeBooks, "house", LANGUAGE, student.house)}</select>
				</td>
			</tr>
			<tr>
				<th>
					<label for="year">Year</label>
				</th>
				<td>
					<select id="year">${getCodeBookOptionsString(codeBooks, "year", LANGUAGE, student.year)}</select>
				</td>
			</tr>
			<tr colSpan="2">
				<td>
					<button>Save</button>
				</td>
			</tr>
		</table>
	`;
	const form = document.querySelector("#edit-form");
	form.innerHTML = tableString;
	form.addEventListener("submit", (event) => handleSubmit(event, student.id));
};

const onWindowLoad = async () => {
	const id = new URLSearchParams(location.search).get("id");
	const codeBooks = await fetchCodeBooks();
	const student = await fetchStudent(id);
	renderEditFormContent(student, codeBooks);
};

window.addEventListener("load", onWindowLoad);
