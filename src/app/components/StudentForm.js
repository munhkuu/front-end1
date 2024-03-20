"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = () => {
  const [studentId, setStudentId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState(""); // New state for birthdate
  const [gender, setGender] = useState(""); // New state for gender
  const [Class, setClass] = useState(""); // New state for class
  const [point, setPoint] = useState(""); // New state for point
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(null);
  const [ufirstname, setuFirstname] = useState("");
  const [usurname, setuSurname] = useState("");
  const [ubirthdate, setuBirthdate] = useState(""); // New state for birthdate
  const [ugender, setuGender] = useState(""); // New state for gender
  const [uClass, setuClass] = useState(""); // New state for class
  const [upoint, setuPoint] = useState("");
  // Fetch the user list when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/post", {
        studentId,
        firstname,
        surname,
        birthdate,
        gender,
        Class,
        point,
      });
      // Check if the response is successful (status code 200)
      if (response.status === 200) {
        // Clear the form fields after successful submission
        setStudentId("");
        setFirstname("");
        setSurname("");
        setBirthdate("");
        setGender("");
        setClass("");
        setPoint("");
        // Refresh the user list
        getUsers();
        alert("Student added successfully!");
      } else {
        throw new Error(
          "Failed to add student. Server responded with status: " +
            response.status
        );
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student. Please try again.");
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete("http://localhost:8080/delete", {
        data: { studentId }, // Pass studentId in the request body
      });
      // Refresh the user list after deletion
      getUsers();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleUpdate = async (
    show,
    ufirstname,
    usurname,
    ubirthdate,
    ugender,
    uClass,
    upoint
  ) => {
    // Remove the user parameter
    try {
      const response = await axios.patch(
        `http://localhost:8080/update/${show}`, // Include show (studentId) in the URL
        {
          studentId: show, // Use show (studentId) directly
          firstname: ufirstname,
          surname: usurname,
          birthdate: ubirthdate,
          gender: ugender,
          Class: uClass,
          point: upoint,
        }
      );
      console.log("Student updated successfully:", response.data);
      setShow(null);
      getUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="">
      <div className="mb-6 max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-[#7743b1] mb-2 text-center">
          Student Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col">
            <label htmlFor="studentId" className="text-sm font-semibold mb-1">
              Student ID
            </label>
            <input
              id="studentId"
              type="text"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="text-sm font-semibold mb-1">
              First Name
            </label>
            <input
              id="firstname"
              type="text"
              placeholder="Enter First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="surname" className="text-sm font-semibold mb-1">
              Surname
            </label>
            <input
              id="surname"
              type="text"
              placeholder="Enter Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="birthdate" className="text-sm font-semibold mb-1">
              Birthdate
            </label>
            <input
              id="birthdate"
              type="text"
              placeholder="Enter Birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-sm font-semibold mb-1">
              Gender
            </label>
            <input
              id="gender"
              type="text"
              placeholder="Enter Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="class" className="text-sm font-semibold mb-1">
              Class
            </label>
            <input
              id="class"
              type="text"
              placeholder="Enter Class"
              value={Class}
              onChange={(e) => setClass(e.target.value)}
              className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="point" className="text-sm font-semibold mb-1">
              Point
            </label>
            <input
              id="point"
              type="text"
              placeholder="Enter Point"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              className="text-black px-6 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#459057] text-white py-2 px-4 rounded-md hover:bg-[#2d6e43] transition-colors duration-300"
          >
            Add Student
          </button>
        </form>
      </div>

      <div className="ml-6">
        <strong className="pl-2">Userlist:</strong>
        <ul className="flex flex-wrap">
          {users.map((user) => (
            <li
              key={user.studentId}
              className="border border-b-gray-300 w-[220px] h-[200px] ml-2 pt-2 pl-2 mt-2"
            >
              <strong>ID:</strong> {user.studentId} <br />
              <strong>Name:</strong> {user.firstname} {user.surname} <br />
              <strong>Birthdate:</strong> {user.birthDate} <br />
              <strong>Gender:</strong> {user.gender} <br />
              <strong>Class:</strong> {user.class} <br />
              <strong>Point:</strong> {user.point} <br />
              <button
                className="border border-b-gray-300 rounded-sm bg-red-500 p-1 justify-center items-center mt-1 mr-1"
                onClick={() => handleDelete(user.studentId)}
              >
                Delete
              </button>
              <button
                className="border border-b-gray-300 rounded-sm bg-[#50189f] p-1 justify-center items-center ml-1 mr-1"
                onClick={() => {
                  setShow(user.studentId), // Set show state
                    setuFirstname(user.firstname);
                  setuSurname(user.surname); // Correct typo here
                  setuBirthdate(user.birthDate);
                  setuGender(user.gender);
                  setuClass(user.class);
                  setuPoint(user.point);
                }}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>

      {show && (
        <div className="mt-6 mb-6 max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-bold text-[#7743b1] mb-2 text-center">
            Update Student
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(show); // Pass the studentId to handleUpdate
            }}
            className="space-y-2"
          >
            <div className="flex flex-col">
              <label
                htmlFor="ufirstname"
                className="text-sm font-semibold mb-1"
              >
                First Name
              </label>
              <input
                id="ufirstname"
                type="text"
                placeholder="Enter First Name"
                value={ufirstname}
                onChange={(e) => setuFirstname(e.target.value)}
                className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="usurname" className="text-sm font-semibold mb-1">
                Surname
              </label>
              <input
                id="usurname"
                type="text"
                placeholder="Enter Surname"
                value={usurname}
                onChange={(e) => setuSurname(e.target.value)}
                className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="ubirthdate"
                className="text-sm font-semibold mb-1"
              >
                Birthdate
              </label>
              <input
                id="ubirthdate"
                type="text"
                placeholder="Enter Birthdate"
                value={ubirthdate}
                onChange={(e) => setuBirthdate(e.target.value)}
                className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="ugender" className="text-sm font-semibold mb-1">
                Gender
              </label>
              <input
                id="ugender"
                type="text"
                placeholder="Enter Gender"
                value={ugender}
                onChange={(e) => setuGender(e.target.value)}
                className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="uClass" className="text-sm font-semibold mb-1">
                Class
              </label>
              <input
                id="uClass"
                type="text"
                placeholder="Enter Class"
                value={uClass}
                onChange={(e) => setuClass(e.target.value)}
                className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="upoint" className="text-sm font-semibold mb-1">
                Point
              </label>
              <input
                id="upoint"
                type="text"
                placeholder="Enter Point"
                value={upoint}
                onChange={(e) => setuPoint(e.target.value)}
                className="py-2 px-6 text-black border border-gray-300 rounded-md focus:outline-none focus:border-[#459057]"
              />
            </div>
            <button
              className="text-white pt-1 hover:bg-[#724fa4] rounded-sm border border-b-gray-300 bg-[#50189f] p-2 justify-center items-center ml-1 mr-1"
              onClick={() =>
                handleUpdate(
                  show,
                  ufirstname,
                  usurname,
                  ubirthdate,
                  ugender,
                  uClass,
                  upoint
                )
              }
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
