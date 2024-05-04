import "./signIn.scss";
import logo from "../../assets/png/logo-no-background.png";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser, loginType } from "../../api/loginApi";
import { useCookies } from "react-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

const SignIn = () => {
  const [, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();
  const [isSubmitting, setSubmission] = useState<boolean>(false);
  console.log(isSubmitting);
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();
  const submitForm = async (data: loginType) => {
    try {
      setSubmission(true);
      const response = await loginUser(data as loginType);
      console.log(response);
      setCookie("jwt", response.token);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message as string);
    } finally {
      setSubmission(false);
    }
  };
  return (
    <div className="login">
      <div className="login-box">
        <img src={logo} className="login-box-logo" alt="logo" />
        <h1 className="login-box-heading">Welcome</h1>
        <h1 className="login-box-heading">Sign in to continue</h1>
        <form
          onSubmit={handleSubmit(async (data) => {
            submitForm(data as loginType);
          })}
        >
          <div className="login-box-input">
            <label className="login-box-input-label" htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: "Username required" })}
              className="login-box-input-element"
              type="text"
              id="username"
            />
          </div>
          {errors.username && (
            <div className="login-box-input-error">
              <br />
              <p className="login-box-input-error-msg">
                {errors?.username?.message?.toString()}
              </p>
            </div>
          )}
          <div className="login-box-input">
            <label className="login-box-input-label" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: "Password required" })}
              className="login-box-input-element"
              type="password"
              id="password"
            />
          </div>
          {errors.password && (
            <div className="login-box-input-error">
              <br />
              <p className="login-box-input-error-msg">
                {errors?.password?.message?.toString()}
              </p>
            </div>
          )}
          <button
            disabled={isSubmitting}
            style={{ backgroundColor: "#c10000" }}
            type="submit"
            className="btn-primary-fill login-box-btn submit-btn "
          >
            Login
          </button>
        </form>
        <NavLink
          style={{ textAlign: "center" }}
          className="btn-primary-outline login-box-btn "
          to={"/register"}
        >
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default SignIn;
