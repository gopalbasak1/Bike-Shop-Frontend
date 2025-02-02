import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useAddRegisterMutation } from "@/redux/features/Users/users.api";
import { Button, Col, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const [addUser, { data, error, isError }] = useAddRegisterMutation();

  const navigate = useNavigate();

  console.log({ data, error, isError });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      user: {
        name: {
          firstName: data.firstName,
          middleName: data.middleName || "",
          lastName: data.lastName,
        },
        email: data.email,
        password: data.password,
      },
    };

    const toastId = toast.loading("Registering...");
    try {
      const response = await addUser(userData).unwrap();
      toast.success("Registration successful!", {
        id: toastId,
        duration: 2000,
      });
      console.log("Response:", response);
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col span={24} md={{ span: 18 }} lg={{ span: 12 }}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="firstName" label="First Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={12} lg={8}>
              <PHInput type="text" name="lastName" label="Last Name" />
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24} md={12} lg={8}>
              <PHInput type="email" name="email" label="Email" />
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24} md={12} lg={8}>
              <PHInput type="password" name="password" label="Password" />
            </Col>
          </Row>

          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-700"
            htmlType="submit"
          >
            Register
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default Signup;
