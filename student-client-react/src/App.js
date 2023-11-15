import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { StudentList } from "./StudentList";
import { StudentCreateForm } from "./StudentCreateForm";
import { StudentDetail } from "./StudentDetail";
import { StudentEditForm } from "./StudentEditForm";

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
	return <RouterProvider router={router} />;
}

export default App;
