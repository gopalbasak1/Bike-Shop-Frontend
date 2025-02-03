import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { logout } from "@/redux/features/auth/authSlice";
import { useChangePasswordMutation } from "@/redux/features/Users/users.api";
import { useAppDispatch } from "@/redux/hook";
import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = await changePassword(data);
    console.log(res);

    if (res?.data?.success) {
      // ✅ Correct condition
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password: " />

        <PHInput type="text" name="newPassword" label="New Password: " />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
