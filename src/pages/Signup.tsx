import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import { useAddRegisterMutation } from "@/redux/features/Users/users.api";
import { Button, Col, Divider, Row, Typography } from "antd";

import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const { Title, Text } = Typography;

const Signup = () => {
  const [addUser] = useAddRegisterMutation();
  const [imageUrl, setImageUrl] = useState<string>("");
  const navigate = useNavigate();

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_API_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

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
        image: imageUrl,
      },
    };

    const toastId = toast.loading("Registering...");
    try {
      await addUser(userData).unwrap();
      toast.success("Registration successful!", {
        id: toastId,
        duration: 2000,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <Row justify="center" style={{ padding: "40px 20px" }}>
      <Col span={24} md={16} lg={12} className="signup-container">
        <Title level={2} className="text-center">
          Create an Account
        </Title>
        <Text className="text-center block mb-5">
          Fill in your details to register an account.
        </Text>

        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Information</Divider>
          <Row gutter={16}>
            <Col span={24} md={8}>
              <PHInput
                type="text"
                name="firstName"
                label="First Name"
                className="signup-input"
              />
            </Col>
            <Col span={24} md={8}>
              <PHInput
                type="text"
                name="middleName"
                label="Middle Name"
                className="signup-input"
              />
            </Col>
            <Col span={24} md={8}>
              <PHInput
                type="text"
                name="lastName"
                label="Last Name"
                className="signup-input"
              />
            </Col>
          </Row>

          <Divider>Account Details</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <PHInput
                type="email"
                name="email"
                label="Email"
                className="signup-input"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <PHInput
                type="password"
                name="password"
                label="Password"
                className="signup-input"
              />
            </Col>
          </Row>

          <Divider>Profile Picture</Divider>
          <Row gutter={16} align="middle">
            <Col span={24}>
              <input
                className="mb-5"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
              />
              {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" />}
            </Col>
          </Row>

          <Button
            className="w-full mt-5 bg-blue-500 text-white hover:bg-blue-700"
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
