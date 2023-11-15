import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { StudentList } from "./StudentList";
import { LanguageContext } from "./LanguageContext";
import { CodebooksContext } from "./CodebooksContext";
import { StudentCreateForm } from "./StudentCreateForm";
import { StudentDetail } from "./StudentDetail";
import { StudentEditForm } from "./StudentEditForm";

const LANGUAGE = "en";

const router = createBrowserRouter([
	{
		path: "/",
		element: <StudentList />,
	},
	{
		path: "/students/:id",
		element: <StudentDetail />,
	},
	{
		path: "/students/:id/edit",
		element: <StudentEditForm />,
	},
	{
		path: "/students/create",
		element: <StudentCreateForm />,
	},
]);

function App() {
	const [gender, setGender] = useState([]);
	const [house, setHouse] = useState([]);
	const [year, setYear] = useState([]);

	const fetchCodebooks = () => {
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
		fetchCodebooks();
	}, []);

	return gender.length > 0 && house.length > 0 && year.length > 0 ? (
		<LanguageContext.Provider value={LANGUAGE}>
			<CodebooksContext.Provider value={{ gender, house, year }}>
				<RouterProvider router={router} />
			</CodebooksContext.Provider>
		</LanguageContext.Provider>
	) : null;
}

export default App;
