import { Button, Col, Flex, Row } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetAllProductQuery,
  useGetSingleProductQueryQuery,
  useUpdateProductMutation,
} from "@/redux/features/admin/admin.api";
import { toast } from "sonner";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import PHTextArea from "@/components/form/PHTextArea";
import { categoryOptions } from "@/constants/global";
import { useState } from "react";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: productData } = useGetSingleProductQueryQuery(id ?? "");
  const [updateProduct] = useUpdateProductMutation();
  const { refetch } = useGetAllProductQuery(undefined);

  const [imageUrl, setImageUrl] = useState(productData?.image || ""); // 🖼️ Store current image URL

  // ✅ Handle Image Upload
  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    ); // Cloudinary preset
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const res = await fetch(import.meta.env.VITE_CLOUDINARY_API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setImageUrl(data.secure_url); // 🖼️ Update state with new image URL
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  // ✅ Handle Form Submission
  const onSubmit = async (formData) => {
    if (!id) {
      toast.error("Invalid product ID!");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        image: imageUrl || productData?.image, // 🖼️ Keep old image if no new one is uploaded
      };

      await updateProduct({ _id: id, data: updatedData }).unwrap();
      navigate("/admin/all-product");
      refetch();
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <Flex>
      <Col>
        <PHForm onSubmit={onSubmit} defaultValues={productData}>
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
            <PHInput label="Quantity" name="quantity" type="text" />
          </Row>

          {/* 🖼️ Image Upload Section */}
          <input
            className="mb-5"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
          />

          {/* 🖼️ Show Current Image */}
          {imageUrl && <img src={imageUrl} alt="Product Image" width="100" />}

          <PHTextArea
            name="description"
            label="Product Description"
            className="rounded-xl"
          />
          <Button htmlType="submit">Update Product</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default UpdateProduct;
