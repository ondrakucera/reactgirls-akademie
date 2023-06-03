import PropTypes from "prop-types";

export const StudentList = ({ students, context }) => {
	return (
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
	);
};

StudentList.propTypes = {
	students: PropTypes.arrayOf(PropTypes.object).isRequired,
	context: PropTypes.object.isRequired,
};
