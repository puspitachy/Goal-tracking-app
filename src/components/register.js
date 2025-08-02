import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [firstName, setFirstName] = useState(""); 
const [lastName, setLastName] = useState(""); 

// Function for  when user submits the registration form.
const handleRegister = async (e) => {
e.preventDefault(); //  this funtion stops the page from reloading on form submit
try {
//This  Creates user with email and password using Firebase Authentication, the registered user goes automatically to firebase database.
await createUserWithEmailAndPassword(auth, email, password);
const currentUser = auth.currentUser;
console.log("Current user details:", currentUser);


  // condition given fpr  proceeding if theur is  a user
  if (currentUser) {
    // Save additional profile info in Firestore.
    await setDoc(doc(db, "Users", currentUser.uid), {
      email: currentUser.email,
      firstName: firstName,
      lastName: lastName,
      photo: "" // placeholder for user photo-currently not working on this yet, will be used for future work
    });
  }
  
  console.log("You have Registered Successfully!!");
  toast.success("You have Registered Successfully!!", {
    position: "top-center",
  });
} catch (error) {
  // Logging error details if occures
  console.error("Registration error:", error.message);
  toast.error(error.message, {
    position: "bottom-center",
  });
}
};

return (
<form onSubmit={handleRegister}>
<h3>Sign Up</h3>

ini

Copy
  <div className="mb-3">
    <label>First Name</label>
    <input
      type="text"
      className="form-control"
      placeholder="Please enter your first name"  // a bit more friendly prompt
      onChange={(e) => setFirstName(e.target.value)}
      required
    />
  </div>

  <div className="mb-3">
    <label>Last Name</label>
    <input
      type="text"
      className="form-control"
      placeholder="Please enter your last name"
      onChange={(e) => setLastName(e.target.value)}
      required   // added required to maintain consistency
    />
  </div>

  <div className="mb-3">
    <label>Email address</label>
    <input
      type="email"
      className="form-control"
      placeholder="Please enter your email"
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div className="mb-3">
    <label>Password</label>
    <input
      type="password"
      className="form-control"
      placeholder="Please enter your password"
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>

  <div className="d-grid">
    <button type="submit" className="btn btn-primary">
      Sign Up
    </button>
  </div>

  
  <p className="forgot-password text-right">
    Already registered? <a href="/login">Login</a>
  </p>
</form>
);
}

export default Register;

