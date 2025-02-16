import { Button } from "@/components/ui/button";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/redux/features/Users/users.api";
import { Modal, Input, Form } from "antd";
import { useEffect, useState } from "react"; // ✅ Import useEffect
import { FieldValues } from "react-hook-form";
import { FaPen } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const {
    data: profile,
    isLoading,
    error,
    refetch,
  } = useGetMeQuery(undefined, { refetchOnMountOrArgChange: true });
  const [updateProfile] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  console.log(profile);

  // ✅ Auto-refresh profile data when component mounts
  useEffect(() => {
    refetch();
  }, [profile]);

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

      if (data.secure_url) {
        setImageUrl(data.secure_url); // ✅ Update state with uploaded image URL
        form.setFieldsValue({ image: data.secure_url }); // ✅ Update form field
      }
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const openEditModal = () => {
    form.setFieldsValue({
      firstName: profile?.data?.name?.firstName || "",
      middleName: profile?.data?.name?.middleName || "",
      lastName: profile?.data?.name?.lastName || "",
      email: profile?.data?.email || "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async (values: FieldValues) => {
    try {
      const updatedName = {
        ...(values.firstName && { firstName: values.firstName }),
        ...(values.middleName && { middleName: values.middleName }),
        ...(values.lastName && { lastName: values.lastName }),
      };

      const payload = {
        user: {
          ...(Object.keys(updatedName).length > 0 && { name: updatedName }),
          ...(values.email && { email: values.email }),
          image: imageUrl || profile?.data?.image, // ✅ Use updated image URL
        },
      };

      await updateProfile({
        id: profile?.data?.id,
        data: payload,
      }).unwrap();

      toast.success("Profile updated successfully");

      if (values.email && values.email !== profile?.data?.email) {
        toast.info("Email updated. Please log in again.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        refetch(); // ✅ Refresh profile after update
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;

  return (
    <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-50 dark:text-gray-800">
      <span onClick={openEditModal} className="cursor-pointer">
        <FaPen className="hover:text-red-500" />
      </span>
      <img
        src={profile?.data?.image || ""}
        alt="Profile"
        className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
      />
      <div className="space-y-4 text-center divide-y dark:divide-gray-300">
        <div className="my-2 space-y-1">
          <h2 className="text-xl font-semibold sm:text-2xl">
            {profile?.data?.fullName || "User Name"}
          </h2>
          <div>
            <span className="flex justify-center items-center">
              <a className="px-5 text-xs sm:text-base dark:text-gray-600">
                {profile?.data?.role
                  ? profile.data.role.charAt(0).toUpperCase() +
                    profile.data.role.slice(1)
                  : "User Role"}
              </a>
            </span>
          </div>
        </div>
        <div className="flex justify-center pt-2 space-x-4 align-center">
          <a
            href={`mailto:${profile?.data?.email}`}
            className="font-bold text-xl text-[#b0b021]"
          >
            <MdEmail />
          </a>
          <a href={`mailto:${profile?.data?.email}`} className="font-bold">
            {profile?.data?.email}
          </a>
        </div>
      </div>

      {/* ✅ Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" onClick={() => form.submit()}>
            Update
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>
          <Form.Item label="Middle Name" name="middleName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Profile Image">
            <input type="file" onChange={handleImageUpload} accept="image/*" />
          </Form.Item>
          <Form.Item name="image">
            {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" />}{" "}
            {/* Show uploaded image URL */}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyProfile;
