import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LanguageContext } from "./LanguageContext";
import { CodeBooksContext } from "./CodeBooksContext";
import { getCodeBookItemName } from "./code-book";

export const StudentList = () => {
	const language = useContext(LanguageContext);
	const codeBooks = useContext(CodeBooksContext);
	const [students, setStudents] = useState([]);

	const fetchStudents = async () => {
		const response = await fetch("http://localhost:8080/students");
		const students = await response.json();
		setStudents(students);
	};

	const deleteStudent = async (id) => {
		await fetch(`http://localhost:8080/students/${id}`, { method: "DELETE" });
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	const handleDeleteButton = async (id) => {
		await deleteStudent(id);
		await fetchStudents();
	};

	return (
		<>
			<h1>List of students</h1>
			{students.length > 0 ? (
				<table className="table table-light table-striped table-bordered">
					<thead>
						<tr>
							<th>Name</th>
							<th>Gender</th>
							<th>House</th>
							<th>Year</th>
							<th></th>
						</tr>
					</thead>
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
									<Link to={`/students/${student.id}/edit`}>Edit</Link>{" "}
									<button type="button" onClick={() => handleDeleteButton(student.id)} className="btn btn-danger">
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : null}
			<p>
				<Link to="/students/create">Create new student</Link>
			</p>
		</>
	);
};
