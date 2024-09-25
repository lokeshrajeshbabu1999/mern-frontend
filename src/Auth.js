import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Auth = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log("data", data);
        axios.post("/api/student/login", data).then((response) => {
            console.log(response.status, response.data);
        });
        navigate('/students')
    };

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit(onSubmit)} className="student-form">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email-Id</label>
                        <input
                            name="email"
                            placeholder="lokesh@gmail.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                    message: "Password must contain at least one letter and one number"
                                }
                            })}
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>

                    <input type="submit" className="submit-btn" />
                </form>
            </div>
        </>
    )
}

export default Auth;
