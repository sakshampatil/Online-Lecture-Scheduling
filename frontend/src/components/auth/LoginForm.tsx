import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../store/services/authApi";
import { ToastContainer, toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [
    login,
    { data: loginData, error: loginError, isError: isLoginError, isSuccess: isLoginSuccess },
  ] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Logged In", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("LOGIN DATA = ", loginData);

      dispatch(setUser({ data: loginData }));
      navigate("/courses");
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isLoginError) {
      console.log(loginError);
      toast.error("Login failed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [isLoginError, loginError]);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      console.log("Submitting login form:", values);
      login(values);
      action.resetForm();
    },
  });

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          fullWidth
          value={values.email}
          onChange={handleChange("email")}
          isInvalid={errors.email ? true : false}
          isClearable
          errorMessage={errors.email}
        />

        <Input
          type="password"
          label="Password"
          fullWidth
          value={values.password}
          onChange={handleChange("password")}
          isInvalid={errors.password ? true : false}
          isClearable
        />
        <Button type="submit" className="mt-12">
          Login
        </Button>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Fragment>
  );
};

export default LoginForm;
