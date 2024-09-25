import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Students = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log("data", data);

        if (editingStudent) {
            axios.put("/api/student/details", data).then((response) => {
                console.log(response.status, response.data);
                setStudents((prevStudents) =>
                    prevStudents.map(student =>
                        student.Name === editingStudent.Name ? response.data : student
                    )
                );
                setEditingStudent(null);
                setIsFormVisible(false); // Hide form after submission
            });
        } else {
            axios.post("/api/student/details", data).then((response) => {
                console.log(response.status, response.data);
                setStudents([...students, response.data]);
                setIsFormVisible(false); // Hide form after submission
            });
        }
    };

    useEffect(() => {
        axios.get('api/student/details')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleEdit = (student) => {
        setEditingStudent(student);
        setValue("Name", student.Name);
        setValue("DOB", student.DOB);
        setValue("Gender", student.Gender);
        setValue("Country", student.Country);
        setValue("State", student.State);
        setValue("Email_Id", student.Email_Id);
        setValue("Hobbies", student.Hobbies);
        setValue("Educational_Qualification", student.Educational_Qualification);
        setValue("Mobile_Number", student.Mobile_Number);
        setIsFormVisible(true); // Show form when editing
    };

    const handleDelete = (studentName) => {
        axios.delete(`/api/student/details`, { data: { "name": studentName } })
            .then(response => {
                console.log(response.status);
                setStudents(students.filter(student => student.Name !== studentName));
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    };

    const handleNewRegistration = () => {
        setEditingStudent(null);
        setValue("Name", "");
        setValue("DOB", "");
        setValue("Gender", "");
        setValue("Country", "");
        setValue("State", "");
        setValue("Email_Id", "");
        setValue("Hobbies", "");
        setValue("Educational_Qualification", "");
        setValue("Mobile_Number", "");
        setIsFormVisible(true); // Show form for new registration
    };

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <>
            <div className="App">
                <div className="header-container">
                    <input type="button" className="submit-btn2" value="LOGOUT" onClick={handleClick} />
                    <input type="button" className="submit-btn2" value="New Registration" onClick={handleNewRegistration} /> {/* New Registration button */}
                </div>
                {students.length > 0 && (
                    <div className="table-container">
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Gender</th>
                                    <th>Country</th>
                                    <th>State</th>
                                    <th>Email-Id</th>
                                    <th>Hobbies</th>
                                    <th>Educational Qualification</th>
                                    <th>Mobile Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.Name}</td>
                                        <td>{student.DOB}</td>
                                        <td>{student.Gender}</td>
                                        <td>{student.Country}</td>
                                        <td>{student.State}</td>
                                        <td>{student.Email_Id}</td>
                                        <td>{student.Hobbies}</td>
                                        <td>{student.Educational_Qualification}</td>
                                        <td>{student.Mobile_Number}</td>
                                        <td>
                                            <button onClick={() => handleEdit(student)}>Edit</button>
                                            <button onClick={() => handleDelete(student.Name)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {isFormVisible && ( // Show form based on state
                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)} className="student-form">
                        <h2>{editingStudent ? 'Edit Student' : 'Student Details Form'}</h2>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                                name="Name"
                                placeholder="Karthick"
                                {...register("Name", { required: true })} />
                            {errors.Name && <p className="error-message">This field is required</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="DOB">Date of Birth:</label>
                            <input
                                id="DOB"
                                type="date"
                                {...register("DOB", {
                                    required: "Date of Birth is required",
                                    pattern: {
                                        value: /^\d{4}-\d{2}-\d{2}$/,
                                        message: "Invalid date format (YYYY-MM-DD)"
                                    }
                                })} />
                            {errors.DOB && <p className="error-message">{errors.DOB.message}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Gender">Gender</label>
                            <input
                                name="Gender"
                                placeholder="Male"
                                {...register("Gender", { required: true })} />
                            {errors.Gender && <p className="error-message">This field is required</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Country">Country</label>
                            <input
                                name="Country"
                                placeholder="India"
                                {...register("Country", { required: true })} />
                            {errors.Country && <p className="error-message">This field is required</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="State">State</label>
                            <input
                                name="State"
                                placeholder="Tamil Nadu"
                                {...register("State", { required: true })} />
                            {errors.State && <p className="error-message">This field is required</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Email_Id">Email-Id</label>
                            <input
                                name="Email_Id"
                                placeholder="lokesh@gmail.com"
                                {...register("Email_Id", {
                                    required: true,
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Entered value does not match email format"
                                    }
                                })} />
                            {errors.Email_Id && <p className="error-message">{errors.Email_Id.message}</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Hobbies">Hobbies</label>
                            <input
                                name="Hobbies"
                                placeholder="Playing Cricket"
                                {...register("Hobbies", { required: true })} />
                            {errors.Hobbies && <p className="error-message">This field is required</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Educational_Qualification">Educational Qualification</label>
                            <input
                                name="Educational_Qualification"
                                placeholder="Bachelor of Engineering"
                                {...register("Educational_Qualification", { required: true })} />
                            {errors.Educational_Qualification && <p className="error-message">This field is required</p>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="Mobile_Number">Mobile Number</label>
                            <input
                                name="Mobile_Number"
                                placeholder="9667785432"
                                type="tel"
                                {...register("Mobile_Number", {
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Entered value does not match mobile number format"
                                    }
                                })} />
                            {errors.Mobile_Number && <p className="error-message">{errors.Mobile_Number.message}</p>}
                        </div>

                        <input type="submit" className="submit-btn" />
                    </form>
                </div>
            )}
        </>
    );
};

export default Students;
