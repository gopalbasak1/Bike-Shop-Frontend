import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import PHTextArea from "@/components/form/PHTextArea";
import { categoryOptions } from "@/constants/global";
import { useAddProductMutation } from "@/redux/features/admin/admin.api";
import { Button, Col, Flex, Row } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateProduct = () => {
  const [addProduct] = useAddProductMutation();
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // Handle image upload to Cloudinary
  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    ); // Get this from Cloudinary settings
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); // Replace with your Cloudinary cloud name

    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setImageUrl(data.secure_url); // Save the uploaded image URL
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const { name, brand, model, category, price, totalQuantity, description } =
      data;

    const productData = {
      name,
      brand,
      category,
      model,
      price: Number(price),
      totalQuantity: Number(totalQuantity),
      description,
      image: imageUrl,
    };
    const toastId = toast.loading("Product Creating in");

    try {
      // Call the API mutation
      const response = await addProduct(productData).unwrap();
      console.log("Product added successfully:", response);
      if (response.error) {
        toast.error(response.error.data.message, { id: toastId });
      } else {
        navigate("/admin/all-product");
        toast.success("Product create successfully", {
          id: toastId,
        });
      }
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast.error(error.data.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Flex>
      <Col>
        <PHForm onSubmit={onSubmit}>
          <Row className="gap-5">
            <PHInput label="Name" name="name" type="text" />
            <PHInput label="Brand" name="brand" type="text" />
          </Row>

          <Row className="gap-5">
            <PHSelect
              label="Category"
              name="category"
              options={categoryOptions}
            />

            <PHInput label="Price" name="price" type="text" />
          </Row>

          <Row className="gap-5">
            <PHInput label="Model" name="model" type="text" />

            <PHInput label="Total Quantity" name="totalQuantity" type="text" />
          </Row>
          {/* Image Upload Input */}
          <input
            className="mb-5"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
          />
          {imageUrl && <img src={imageUrl} alt="Uploaded" width="100" />}

          <PHTextArea
            name="description"
            label="Product Description"
            className="rounded-xl"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateProduct;
