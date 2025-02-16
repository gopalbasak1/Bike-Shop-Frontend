import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./Login.css";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [addLogin] = useLoginMutation();

  const defaultValues = {
    email: "admin@gmail.com",
    password: "123456",
  };

  // console.log("data", data);
  // console.log("error", error);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await addLogin(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;
      //console.log(user);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row
      className="bg"
      justify="center"
      align="middle"
      style={{ height: "100vh" }}
    >
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput className="inputBg" type="text" name="email" label="Email: " />

        <PHInput
          className="inputBg"
          type="text"
          name="password"
          label="Password: "
        />

        <Button
          className="w-full bg-transparent text-white btn btn"
          htmlType="submit"
        >
          Login
        </Button>
      </PHForm>
      {/* Sign-Up Link */}
      <div className="">
        <p className="text-white mt-4 pl-10">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </Row>
  );
};

export default Login;
