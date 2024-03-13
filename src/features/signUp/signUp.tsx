import "./signUp.scss";
import logo from "../../assets/png/logo-no-background.png";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser, registerUserInterface } from "../../api/registerUserApi";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setSubmission] = useState<boolean>(false);

  const submitForm = async (data: registerUserInterface) => {
    try {
      setSubmission(true);
      const response = await registerUser(data);
      if (response.status) {
        navigate("/login");
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.response.data.message as string);

    } finally {
      setSubmission(false);
    }
  };
  return (
    <div className="register">
      <div className="register-box">
        <img src={logo} className="register-box-logo" alt="logo" />
        <h1 className="register-box-heading">Welcome</h1>
        <h1 className="register-box-heading">Sign up to continue</h1>
        <form
          onSubmit={handleSubmit((data) => {
            submitForm({
              ...data,
              type: "admin",
              userName: data.username,
            } as registerUserInterface);
          })}
        >
          <div className="register-box-input">
            <label className="register-box-input-label" htmlFor="name">
              Name
            </label>
            <input
              {...register("name", { required: "Name required" })}
              className="register-box-input-element"
              type="text"
              id="name"
            />
          </div>
          {errors.name && (
            <div className="register-box-input-error">
              <br />
              <p className="register-box-input-error-msg">
                {errors?.name?.message?.toString()}
              </p>
            </div>
          )}
          <div className="register-box-input">
            <label className="register-box-input-label" htmlFor="email">
              Email address
            </label>
            <input
              {...register("email", {
                required: "Email address required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="register-box-input-element"
              type="text"
              id="email"
            />
          </div>
          {errors.email && (
            <div className="register-box-input-error">
              <br />
              <p className="register-box-input-error-msg">
                {errors?.email?.message?.toString()}
              </p>
            </div>
          )}
          <div className="register-box-input">
            <label className="register-box-input-label" htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: "Username required" })}
              className="register-box-input-element"
              type="text"
              id="username"
            />
          </div>
          {errors.username && (
            <div className="register-box-input-error">
              <br />
              <p className="register-box-input-error-msg">
                {errors?.username?.message?.toString()}
              </p>
            </div>
          )}
          <div className="register-box-input">
            <label className="register-box-input-label" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: "Password required" })}
              className="register-box-input-element"
              type="password"
              id="password"
            />
          </div>
          {errors.password && (
            <div className="register-box-input-error">
              <br />
              <p className="register-box-input-error-msg">
                {errors?.password?.message?.toString()}
              </p>
            </div>
          )}
          <div className="register-box-input">
            <label
              className="register-box-input-label"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <input
              {...register("confirmPassword", {
                required: "confirm Password required",
              })}
              className="register-box-input-element"
              type="password"
              id="confirmPassword"
            />
          </div>
          {errors.password && (
            <div className="register-box-input-error">
              <br />
              <p className="register-box-input-error-msg">
                {errors?.password?.message?.toString()}
              </p>
            </div>
          )}
          <button
            disabled={isSubmitting}
            style={{ backgroundColor: "#c10000" }}
            type="submit"
            className="btn-primary-fill register-box-btn submit-btn "
          >
            Register
          </button>
        </form>
        {/* <button className="btn-primary-outline login-box-btn ">SignIn</button> */}
        <NavLink
          style={{ textAlign: "center" }}
          className="btn-primary-outline login-box-btn "
          to={"/login"}
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
