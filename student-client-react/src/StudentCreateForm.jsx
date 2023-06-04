import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LanguageContext } from "./LanguageContext";
import { CodeBooksContext } from "./CodeBooksContext";
import { getCodeBookOptions, getCodeBookRadioButtons } from "./code-book";

export const StudentCreateForm = () => {
	const language = useContext(LanguageContext);
	const codeBooks = useContext(CodeBooksContext);
	const [student, setStudent] = useState({ firstName: "", lastName: "", gender: "", house: "", year: "" });
	const navigate = useNavigate();

	const saveStudent = async () => {
		const response = await fetch("http://localhost:8080/students", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(student),
		});
		return await response.json();
	};

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const id = await saveStudent();
		navigate(`/students/${id}`);
	};

	return student ? (
		<>
			<form onSubmit={handleSubmit}>
				<table>
					<tbody>
						<tr>
							<th>
								<label htmlFor="first-name">First name</label>
							</th>
							<td>
								<input
									id="first-name"
									value={student.firstName}
									onChange={(event) => setFirstName(event.target.value)}
								/>
							</td>
						</tr>
						<tr>
							<th>
								<label htmlFor="last-name">Last name</label>
							</th>
							<td>
								<input id="last-name" value={student.lastName} onChange={(event) => setLastName(event.target.value)} />
							</td>
						</tr>
						<tr>
							<th>Gender</th>
							<td>
								{getCodeBookRadioButtons(codeBooks, "gender", language, student.gender, (event) =>
									setGender(event.target.value)
								)}
							</td>
						</tr>
						<tr>
							<th>
								<label htmlFor="house">House</label>
							</th>
							<td>
								<select id="house" value={student.house} onChange={(event) => setHouse(event.target.value)}>
									{getCodeBookOptions(codeBooks, "house", language, true)}
								</select>
							</td>
						</tr>
						<tr>
							<th>
								<label htmlFor="year">Year</label>
							</th>
							<td>
								<select id="year" value={student.year} onChange={(event) => setYear(event.target.value)}>
									{getCodeBookOptions(codeBooks, "year", language, true)}
								</select>
							</td>
						</tr>
						<tr colSpan="2">
							<td>
								<button>Save</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
			<p>
				<Link to="/">Back to student list.</Link>
			</p>
		</>
	) : null;
};
