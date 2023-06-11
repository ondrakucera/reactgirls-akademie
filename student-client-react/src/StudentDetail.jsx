import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LanguageContext } from "./LanguageContext";
import { CodeBooksContext } from "./CodeBooksContext";
import { getCodeBookItemName } from "./code-book";

export const StudentDetail = () => {
	const { id } = useParams();
	const language = useContext(LanguageContext);
	const codeBooks = useContext(CodeBooksContext);
	const [student, setStudent] = useState(null);

	const fetchStudent = async () => {
		const response = await fetch(`http://localhost:8080/students/${id}`);
		const student = await response.json();
		setStudent(student);
	};

	useEffect(() => {
		fetchStudent();
	}, []);

	return (
		<>
			<h1>Student detail</h1>
			{student ? (
				<table className="table table-light table-bordered">
					<tbody>
						<tr>
							<th>Name</th>
							<td>
								{student.firstName} {student.lastName}
							</td>
						</tr>
						<tr>
							<th>Gender</th>
							<td>{getCodeBookItemName(codeBooks, "gender", student.gender, language)}</td>
						</tr>
						<tr>
							<th>House</th>
							<td>{getCodeBookItemName(codeBooks, "house", student.house, language)}</td>
						</tr>
						<tr>
							<th>Year</th>
							<td>{getCodeBookItemName(codeBooks, "year", student.year, language)}</td>
						</tr>
					</tbody>
				</table>
			) : null}
			<p>
				<Link to="/">Back to student list</Link>{" "}
				{student ? (
					<Link to={`/students/${student.id}/edit`}>
						Edit {student.firstName} {student.lastName}
					</Link>
				) : null}
			</p>
		</>
	);
};
