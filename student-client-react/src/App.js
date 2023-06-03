import { useEffect, useState } from "react";
import "./App.css";
import { StudentList } from "./StudentList";

const LANGUAGE = "en";

function App() {
	const [gender, setGender] = useState([]);
	const [house, setHouse] = useState([]);
	const [year, setYear] = useState([]);

	const fetchCodeBooks = async () => {
		fetch("http://localhost:8080/codebooks/GENDER")
			.then((response) => response.json())
			.then((body) => {
				setGender(body);
			});
		fetch("http://localhost:8080/codebooks/HOUSE")
			.then((response) => response.json())
			.then((body) => {
				setHouse(body);
			});
		fetch("http://localhost:8080/codebooks/YEAR")
			.then((response) => response.json())
			.then((body) => {
				setYear(body);
			});
	};

	useEffect(() => {
		fetchCodeBooks();
	}, []);

	return gender.length > 0 && house.length > 0 && year.length > 0 ? (
		<StudentList context={{ language: LANGUAGE, gender, house, year }} />
	) : null;
}

export default App;
