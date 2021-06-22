import React, { useState } from "react";
import axios from "axios";
import {fire} from '../firebase';

export default function StudentSignup() {
	const [studentUser, setStudent] = useState({
		studentId: "12345",
		fullName: "",
		emailId: "",
		contactNumber: "",
		grade: 0,
		age: 0,
		stateAddress: "",
		districtAddress: "",
		schoolName: "",
	});

    const [password, setPassword] = useState("12345678");

	const handleChange = (e) => {
		setStudent({
			...studentUser,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

        fire.auth()
        .createUserWithEmailAndPassword(studentUser.emailId, password)
        .then((data) => {
            console.log(data);

            axios
			.post("http://localhost:7600/students", studentUser)
			.then(
				(res) => {
					console.log(res);
				},
				(error) => {
					throw error;
				}
			)
			.catch((error) => {
				console.log(error);
			});
        })
        .catch((error) => {
            switch(error.code){
                case 'auth/email-already-in-use':
                case 'auth/invalid-email':
                    console.log(error.message);
                    alert(error.message);
                    break;
                case 'auth/weak-password':
                    console.log(error.message);
                    alert(error.message);
                    break;
                default:
                    break;
            }
        })

		setStudent({
			studentId: "12345",
			fullName: "",
			emailId: "",
			contactNumber: "",
			grade: 0,
			age: 0,
			stateAddress: "",
			districtAddress: "",
			schoolName: "",
		});
	};

	return (
		<div className="student_signup">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="fullName"
					placeholder="Full Name"
					value={studentUser.fullName}
					onChange={handleChange}
				/>
				<input
					type="email"
					name="emailId"
					placeholder="Email Id"
					value={studentUser.emailId}
					onChange={handleChange}
				/>
                {/* <input
					type="password"
					name="password"
					placeholder="Password"
					value={password}
					onChange={(value) => setPassword(value)}
				/> */}
				<input
					type="number"
					name="contactNumber"
					placeholder="Contact Number"
					value={studentUser.contactNumber}
					onChange={handleChange}
				/>
				<input
					type="number"
					name="grade"
					placeholder="Class"
					value={studentUser.grade}
					onChange={handleChange}
				/>
				<input
					type="number"
					name="age"
					placeholder="Age"
					value={studentUser.age}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="stateAddress"
					placeholder="Address: State"
					value={studentUser.stateAddress}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="districtAddress"
					placeholder="Address: District"
					value={studentUser.districtAddress}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="schoolName"
					placeholder="School Name"
					value={studentUser.schoolName}
					onChange={handleChange}
				/>
				<button type="submit" onSubmit={handleSubmit}>
					Sign Up
				</button>
			</form>
		</div>
	);
}
