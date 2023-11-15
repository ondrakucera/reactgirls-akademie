import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { StudentList } from "./StudentList";
import { LanguageContext } from "./LanguageContext";
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
	return (
		<LanguageContext.Provider value={LANGUAGE}>
			<RouterProvider router={router} />
		</LanguageContext.Provider>
	);
}

export default App;
