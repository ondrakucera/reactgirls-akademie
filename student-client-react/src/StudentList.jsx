import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { CODEBOOK_NAME_GENDER, CODEBOOK_NAME_HOUSE, CODEBOOK_NAME_YEAR, getCodebookItemName } from "./codebook";

export const StudentList = () => {
	const [codebooks, setCodebooks] = useState({});
	const [students, setStudents] = useState([]);

	const fetchCodebooks = () => {
		[CODEBOOK_NAME_GENDER, CODEBOOK_NAME_HOUSE, CODEBOOK_NAME_YEAR].forEach((codebook) => {
			fetch(`http://localhost:8080/codebooks/${codebook}`)
				.then((response) => response.json())
				.then((body) => {
					setCodebooks((codebooks) => ({ ...codebooks, [codebook]: body }));
				});
		});
	};

	const fetchStudents = () => {
		return fetch("http://localhost:8080/students")
			.then((response) => response.json())
			.then((students) => setStudents(students));
	};

	const deleteStudent = (id) => {
		return fetch(`http://localhost:8080/students/${id}`, { method: "DELETE" });
	};

	useEffect(() => {
		fetchCodebooks();
		fetchStudents();
	}, []);

	const handleDeleteButton = (id) => {
		deleteStudent(id).then(() => fetchStudents());
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
								<td>{getCodebookItemName(codebooks, CODEBOOK_NAME_GENDER, student.gender)}</td>
								<td>{getCodebookItemName(codebooks, CODEBOOK_NAME_HOUSE, student.house)}</td>
								<td>{getCodebookItemName(codebooks, CODEBOOK_NAME_YEAR, student.year)}</td>
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
