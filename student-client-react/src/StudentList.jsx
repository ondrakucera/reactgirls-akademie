import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const StudentList = ({ context }) => {
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
						<td>{context.gender.find((item) => item.code === student.gender).names[context.language]}</td>
						<td>{context.house.find((item) => item.code === student.house).names[context.language]}</td>
						<td>{context.year.find((item) => item.code === student.year).names[context.language]}</td>
					</tr>
				))}
			</tbody>
		</table>
	) : null;
};

StudentList.propTypes = {
	context: PropTypes.object.isRequired,
};
