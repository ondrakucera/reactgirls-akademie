import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "./LanguageContext";
import { CodeBooksContext } from "./CodeBooksContext";
import { getCodeBookItemName } from "./code-book";

export const StudentList = () => {
	const language = useContext(LanguageContext);
	const codeBooks = useContext(CodeBooksContext);
	const [students, setStudents] = useState([]);
	const [studentDeleted, setStudentDeleted] = useState(false);

	const fetchStudents = async () => {
		const response = await fetch("http://localhost:8080/students");
		const students = await response.json();
		setStudents(students);
		setStudentDeleted(false);
	};

	const deleteStudent = async (id) => {
		await fetch(`http://localhost:8080/students/${id}`, { method: "DELETE" });
	};

	useEffect(() => {
		fetchStudents();
	}, [studentDeleted]);

	const handleDeleteButton = async (id) => {
		await deleteStudent(id);
		setStudentDeleted(true);
	};

	return (
		<>
			{students.length > 0 ? (
				<table>
					<tbody>
						{students.map((student) => (
							<tr key={student.id}>
								<td>
									<Link to={`/students/${student.id}`}>
										{student.firstName} {student.lastName}
									</Link>
								</td>
								<td>{getCodeBookItemName(codeBooks, "gender", student.gender, language)}</td>
								<td>{getCodeBookItemName(codeBooks, "house", student.house, language)}</td>
								<td>{getCodeBookItemName(codeBooks, "year", student.year, language)}</td>
								<td>
									<Link to={`/students/${student.id}/edit`}>Edit</Link>
								</td>
								<td>
									<button type="button" onClick={() => handleDeleteButton(student.id)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
			<p>
				<Link to="/students/create">Create new student.</Link>
			</p>
		</>
	);
};
