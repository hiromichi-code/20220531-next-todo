import Head from "next/head";
import { useState, useEffect } from "react";
import { addDoc, collection, query, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import TaskItem from "./TaskItem";
import { useRouter } from "next/router";

export default function Home(props) {
	const [input, setInput] = useState("");
	const [tasks, setTasks] = useState([{ id: "", title: "" }]);
	const router = useRouter();

	const newTodo = async (e) => {
		await addDoc(collection(db, "tasks"), { title: input });
		setInput("");
	};

	useEffect(() => {
		const q = query(collection(db, "tasks"));
		const unSub = onSnapshot(q, (querySnapshot) => {
			setTasks(
				querySnapshot.docs.map((doc) => ({
					id: doc.id,
					title: doc.data().title,
				}))
			);
		});
		return () => unSub();
	}, []);

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			!user && router.push("/Login/");
		});
		return () => unSub();
	});

	return (
		<div className={`h-screen flex flex-col items-center mt-16`}>
			<Head>
				<title>Next Todo App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<button
				onClick={async () => {
					try {
						await signOut(auth);
						router.push("/Login/");
					} catch (error) {
						alert(error.message);
					}
				}}
				className={`text-3xl text-red-600`}>
				Logout ?
			</button>
			<div>
				<input
					placeholder="input new todo"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className={`border-2 border-green-500 pl-1 py-2 mt-7`}
				/>
				<button
					onClick={newTodo}
					className={`bg-sky-500 text-white py-2 px-3 ml-1`}
					disabled={!input}>
					Add
				</button>
			</div>
			<div className={`mt-8`}>
				{tasks.map((task) => (
					<TaskItem key={task.id} id={task.id} title={task.title} />
				))}
			</div>
		</div>
	);
}
