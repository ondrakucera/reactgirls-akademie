import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LanguageContext } from "./LanguageContext";
import { CODEBOOK_NAME_GENDER, CODEBOOK_NAME_HOUSE, CODEBOOK_NAME_YEAR, getCodebookItemName } from "./codebook";

export const StudentDetail = () => {
	const { id } = useParams();
	const language = useContext(LanguageContext);
	const [codebooks, setCodebooks] = useState({});
	const [student, setStudent] = useState(null);

	const fetchCodebooks = () => {
		[CODEBOOK_NAME_GENDER, CODEBOOK_NAME_HOUSE, CODEBOOK_NAME_YEAR].forEach((codebook) => {
			fetch(`http://localhost:8080/codebooks/${codebook}`)
				.then((response) => response.json())
				.then((body) => {
					setCodebooks((codebooks) => ({ ...codebooks, [codebook]: body }));
				});
		});
	};

	const fetchStudent = () => {
		return fetch(`http://localhost:8080/students/${id}`)
			.then((response) => response.json())
			.then((student) => setStudent(student));
	};

	useEffect(() => {
		fetchCodebooks();
		fetchStudent();
	}, []);

	return (
		<>
			<h1>Student detail</h1>
			{student && codebooks[CODEBOOK_NAME_GENDER] && codebooks[CODEBOOK_NAME_HOUSE] && codebooks[CODEBOOK_NAME_YEAR] ? (
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
							<td>{getCodebookItemName(codebooks, CODEBOOK_NAME_GENDER, student.gender, language)}</td>
						</tr>
						<tr>
							<th>House</th>
							<td>{getCodebookItemName(codebooks, CODEBOOK_NAME_HOUSE, student.house, language)}</td>
						</tr>
						<tr>
							<th>Year</th>
							<td>{getCodebookItemName(codebooks, CODEBOOK_NAME_YEAR, student.year, language)}</td>
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
