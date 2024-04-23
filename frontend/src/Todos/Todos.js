import React, { useState, useEffect } from "react";
import "./Todos.css";
import Todo from "../Todo/Todo";

const url = "http://localhost:3001/todo/all";

function Todos() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchAllTodos = async () => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}
			const todos = await response.json();
			setData(todos);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAllTodos();
	}, []);

	if (loading || !data) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="container mt-5 todos">
			{data.data.todos.map((todo) => {
				return (
					<>
						<Todo todo={todo} />
					</>
				);
			})}
		</div>
	);
}

export default Todos;
