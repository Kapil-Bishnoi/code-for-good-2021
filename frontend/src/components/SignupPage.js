import React, { useState } from "react";
import StudentSignup from "./StudentSignup";

export default function SignupPage() {
	const [userType, setUserType] = useState(null);

	return (
		<div className="signup">
			<div className="user_options">
				<button onClick={() => setUserType("student")}>
					sign up as a student
				</button>
				<button onClick={() => setUserType("mentor")}>
					sign up as a mentor
				</button>
				<button onClick={() => setUserType("evaluator")}>
					sign up as a evaluator
				</button>
			</div>
			<div className="user_form">
				<Signup userType={userType} />
			</div>
		</div>
	);
}

export const Signup = ({ userType }) => {
	if (userType === "student") {
		return <StudentSignup />;
	} else if (userType === "mentor") {
		return "mentor signup";
	} else if (userType === "evaluator") {
		return "evaluator signup";
	}
	return null;
};
