import { LANGUAGE } from "./common.js";
import { deleteStudent, fetchCodeBooks, fetchStudents } from "./rest-api-client.js";
import { getCodeBookItemName } from "./code-book.js";

window.handleDeleteButton = async (id) => {
	await deleteStudent(id);
	location.reload();
};

const createStudentTableRow = (student, codeBooks) => `
<tr>
	<td><a href="detail.html?id=${student.id}">${student.firstName} ${student.lastName}</a></td>
	<td>${getCodeBookItemName(codeBooks, "gender", student.gender, LANGUAGE)}</td>
	<td>${getCodeBookItemName(codeBooks, "house", student.house, LANGUAGE)}</td>
	<td>${getCodeBookItemName(codeBooks, "year", student.year, LANGUAGE)}</td>
	<td>
		<a href="edit.html?id=${student.id}">Edit</a>
	</td>
	<td>
		<button type="button" onclick="handleDeleteButton(${student.id})">
			Delete
		</button>
	</td>
</tr>
`;

const renderStudents = (students, codeBooks) => {
	document.querySelector("#student-table").innerHTML = students
		.map((student) => createStudentTableRow(student, codeBooks))
		.join("");
};

window.addEventListener("load", async () => {
	const codeBooks = await fetchCodeBooks();
	const students = await fetchStudents();
	renderStudents(students, codeBooks);
});
