import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "./LanguageContext";
import { CodeBooksContext } from "./CodeBooksContext";

const getCodeBookName = (codeBooks, codeBookCode, codeBookItemCode, language) => {
	let result = codeBookItemCode;
	const codeBook = codeBooks[codeBookCode];
	if (codeBook) {
		const codeBookItem = codeBook.find((item) => item.code === codeBookItemCode);
		if (codeBookItem && codeBookItem.names[language]) {
			result = codeBookItem.names[language];
		}
	}
	return result;
};

export const StudentList = () => {
	const language = useContext(LanguageContext);
	const codeBooks = useContext(CodeBooksContext);
	const [students, setStudents] = useState([]);

	const fetchStudents = async () => {
		const response = await fetch("http://localhost:8080/students");
		const students = await response.json();
		setStudents(students);
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	return students.length > 0 ? (
		<table>
			<tbody>
				{students.map((student) => (
					<tr key={student.id}>
						<td>
							{student.firstName} {student.lastName}
						</td>
						<td>{getCodeBookName(codeBooks, "gender", student.gender, language)}</td>
						<td>{getCodeBookName(codeBooks, "house", student.house, language)}</td>
						<td>{getCodeBookName(codeBooks, "year", student.year, language)}</td>
					</tr>
				))}
			</tbody>
		</table>
	) : null;
};
