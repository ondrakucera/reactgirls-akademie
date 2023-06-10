const renderStudent = (student, codeBooks) => {
	const ulString = `
		<ul>
			<li>
				Name: ${student.firstName} ${student.lastName}
			</li>
			<li>Gender: ${getCodeBookItemName(codeBooks, "gender", student.gender, LANGUAGE)}</li>
			<li>House: ${getCodeBookItemName(codeBooks, "house", student.house, LANGUAGE)}</li>
			<li>Year: ${getCodeBookItemName(codeBooks, "year", student.year, LANGUAGE)}</li>
		</ul>
		<p>
			<a href="index.html">Back to student list.</a>
			<a href="edit.html?id=${student.id}">Edit ${student.firstName} ${student.lastName}.</a>
		</p>
	`;
	document.body.innerHTML = ulString;
};

const onWindowLoad = async () => {
	const id = new URLSearchParams(location.search).get("id");
	const codeBooks = await fetchCodeBooks();
	const student = await fetchStudent(id);
	renderStudent(student, codeBooks);
};

window.addEventListener("load", onWindowLoad);
