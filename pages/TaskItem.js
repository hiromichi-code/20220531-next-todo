import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, setDoc, deleteDoc, doc } from "firebase/firestore";

export default function TaskItem(props) {
	const [title, setTitle] = useState(props.title);

	const taskRef = collection(db, "tasks");

	const editTask = async () => {
		await setDoc(doc(taskRef, props.id), { title: title }, { merge: true });
	};

	const deleteTask = async () => {
		await deleteDoc(doc(taskRef, props.id));
	};

	return (
		<div className={`flex mt-1`}>
			<input
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
				className={`border-b-2 border-green-500`}
			/>
			<div>
				<button
					className={`bg-green-500 text-white py-2 px-3 ml-1`}
					onClick={editTask}>
					edit
				</button>
				<button
					className={`bg-red-500 text-white py-2 px-3 ml-1`}
					onClick={deleteTask}>
					delete
				</button>
			</div>
		</div>
	);
}
