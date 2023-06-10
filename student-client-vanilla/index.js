const createStudentTableRow = (student, codeBooks) => `
<tr>
	<td><a href="detail.html?id=${student.id}">${student.firstName} ${student.lastName}</a></td>
	<td>${getCodeBookItemName(codeBooks, "gender", student.gender, LANGUAGE)}</td>
	<td>${getCodeBookItemName(codeBooks, "house", student.house, LANGUAGE)}</td>
	<td>${getCodeBookItemName(codeBooks, "year", student.year, LANGUAGE)}</td>
	<td>
		<a href="edit.html?id=${student.id}">Edit</a>
	</td>
</tr>
`;

const renderStudents = (students, codeBooks) => {
	const tableString = `
		<table>
		${students.map((student) => createStudentTableRow(student, codeBooks)).join("")}
		</table>
	`;
	document.body.innerHTML = tableString;
};

const onWindowLoad = async () => {
	const codeBooks = await fetchCodeBooks();
	const students = await fetchStudents();
	renderStudents(students, codeBooks);
};

window.addEventListener("load", onWindowLoad);
