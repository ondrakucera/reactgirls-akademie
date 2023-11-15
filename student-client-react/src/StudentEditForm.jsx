import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LanguageContext } from "./LanguageContext";
import { CodebooksContext } from "./CodebooksContext";
import { getCodebookOptions, getCodebookRadioButtons } from "./codebook";

export const StudentEditForm = () => {
	const { id } = useParams();
	const language = useContext(LanguageContext);
	const codebooks = useContext(CodebooksContext);
	const [student, setStudent] = useState(null);
	const navigate = useNavigate();

	const fetchStudent = () => {
		return fetch(`http://localhost:8080/students/${id}`)
			.then((response) => response.json())
			.then((student) => setStudent(student));
	};

	const saveStudent = () => {
		return fetch(`http://localhost:8080/students/${id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(student),
		});
	};

	useEffect(() => {
		fetchStudent();
	}, []);

	const setFirstName = (firstName) => {
		setStudent({ ...student, firstName });
	};
	const setLastName = (lastName) => {
		setStudent({ ...student, lastName });
	};
	const setGender = (gender) => {
		setStudent({ ...student, gender });
	};
	const setHouse = (house) => {
		setStudent({ ...student, house });
	};
	const setYear = (year) => {
		setStudent({ ...student, year });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		saveStudent().then(() => navigate(`/students/${student.id}`));
	};

	return (
		<>
			<h1>Edit student</h1>
			{student ? (
				<form onSubmit={handleSubmit}>
					<table className="table table-light table-bordered">
						<tbody>
							<tr>
								<th>
									<label htmlFor="first-name" className="form-label">
										First name
									</label>
								</th>
								<td>
									<input
										id="first-name"
										value={student.firstName}
										onChange={(event) => setFirstName(event.target.value)}
										className="form-control"
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="last-name" className="form-label">
										Last name
									</label>
								</th>
								<td>
									<input
										id="last-name"
										value={student.lastName}
										onChange={(event) => setLastName(event.target.value)}
										className="form-control"
									/>
								</td>
							</tr>
							<tr>
								<th>Gender</th>
								<td>
									{getCodebookRadioButtons(codebooks, "gender", language, student.gender, (event) =>
										setGender(event.target.value)
									)}
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="house" className="form-label">
										House
									</label>
								</th>
								<td>
									<select
										id="house"
										value={student.house}
										onChange={(event) => setHouse(event.target.value)}
										className="form-select"
									>
										{getCodebookOptions(codebooks, "house", language)}
									</select>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="year" className="form-label">
										Year
									</label>
								</th>
								<td>
									<select
										id="year"
										value={student.year}
										onChange={(event) => setYear(event.target.value)}
										className="form-select"
									>
										{getCodebookOptions(codebooks, "year", language)}
									</select>
								</td>
							</tr>
							<tr>
								<td colSpan="2">
									<button className="btn btn-primary">Save</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			) : null}
			<p>
				<Link to="/">Back to student list</Link>
			</p>
		</>
	);
};
