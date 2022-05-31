import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

function Login(props) {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unSub = onAuthStateChanged(auth, (user) => {
			user && props.history.push("/");
		});
		return () => unSub();
	}, [props.history]);

	return (
		<div className={`bg-sky-500 h-screen flex items-center justify-center`}>
			<div
				className={`bg-white h-full lg:h-1/2 w-full lg:w-1/5 flex flex-col items-center justify-center`}>
				<h1 className={`text-2xl text-sky-500`}>
					{isLogin ? "Login" : "Register"}
				</h1>
				<small className={`text-sky-500 mt-5`}>Email</small>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={`border-2 border-sky-500 pl-1`}
					placeholder="input Email"
				/>
				<small className={`text-sky-500 mt-5`}>Password</small>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={`border-2 border-sky-500 pl-1`}
					placeholder="input Password"
				/>
				<button
					className={`bg-sky-500 text-white py-1 px-2 mt-8`}
					onClick={
						isLogin
							? async () => {
									try {
										await signInWithEmailAndPassword(auth, email, password);
										props.history.push("/");
									} catch (error) {
										alert(error.message);
									}
							  }
							: async () => {
									try {
										await createUserWithEmailAndPassword(auth, email, password);
										props.history.push("/");
									} catch (error) {
										alert(error.message);
									}
							  }
					}>
					{isLogin ? "Login" : "Register"}
				</button>
				<p
					onClick={(e) => setIsLogin(!isLogin)}
					className={`text-sky-500 cursor-pointer mt-5 border-b-2 border-sky-500`}>
					{isLogin ? "Create new account？" : "Back to Login"}
				</p>
			</div>
		</div>
	);
}

export default Login;
