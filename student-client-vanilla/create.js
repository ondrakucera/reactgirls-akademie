const handleSubmit = async (event) => {
	event.preventDefault();

	const form = event.target;

	const firstName = document.querySelector("#first-name").value;
	const lastName = document.querySelector("#last-name").value;
	const gender = form["gender"].value;
	const house = document.querySelector("#house").value;
	const year = document.querySelector("#year").value;
	const student = { firstName, lastName, gender, house, year };

	const id = await createStudent(student);

	location.href = `detail.html?id=${id}`;
};

const renderCreateFormContent = (codeBooks) => {
	const tableString = `
		<table>
			<tr>
				<th>
					<label for="first-name">First name</label>
				</th>
				<td>
					<input id="first-name">
				</td>
			</tr>
			<tr>
				<th>
					<label for="last-name">Last name</label>
				</th>
				<td>
					<input id="last-name">
				</td>
			</tr>
			<tr>
				<th>Gender</th>
				<td>${getCodeBookRadioButtonsString(codeBooks, "gender", LANGUAGE, "")}</td>
			</tr>
			<tr>
				<th>
					<label for="house">House</label>
				</th>
				<td>
					<select id="house">${getCodeBookOptionsString(codeBooks, "house", LANGUAGE, "", true)}</select>
				</td>
			</tr>
			<tr>
				<th>
					<label for="year">Year</label>
				</th>
				<td>
					<select id="year">${getCodeBookOptionsString(codeBooks, "year", LANGUAGE, "", true)}</select>
				</td>
			</tr>
			<tr colSpan="2">
				<td>
					<button>Save</button>
				</td>
			</tr>
		</table>
	`;
	const form = document.querySelector("#create-form");
	form.innerHTML = tableString;
	form.addEventListener("submit", handleSubmit);
};

const onWindowLoad = async () => {
	const codeBooks = await fetchCodeBooks();
	renderCreateFormContent(codeBooks);
};

window.addEventListener("load", onWindowLoad);
