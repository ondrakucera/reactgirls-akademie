import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { LanguageContext } from "./LanguageContext";
import { CodeBooksContext } from "./CodeBooksContext";
import { getCodeBookName } from "./code-book";

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

	return student ? (
		<>
			<ul>
				<li>
					Name: {student.firstName} {student.lastName}
				</li>
				<li>Gender: {getCodeBookName(codeBooks, "gender", student.gender, language)}</li>
				<li>House: {getCodeBookName(codeBooks, "house", student.house, language)}</li>
				<li>Year: {getCodeBookName(codeBooks, "year", student.year, language)}</li>
			</ul>
			<p><Link to="/">Back to student list.</Link></p>
		</>
	) : null;
};
