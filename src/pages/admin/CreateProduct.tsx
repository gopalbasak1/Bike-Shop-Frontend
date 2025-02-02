import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHSelect from "@/components/form/PHSelect";
import PHTextArea from "@/components/form/PHTextArea";
import { categoryOptions } from "@/constants/global";
import { useAddProductMutation } from "@/redux/features/admin/admin.api";
import { Button, Col, Flex, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CreateProduct = () => {
  const [addProduct] = useAddProductMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const { name, brand, category, price, quantity, description } = data;

    const productData = {
      name,
      brand,
      category,
      price: Number(price),
      quantity: Number(quantity),
      description,
    };

    try {
      // Call the API mutation
      const response = await addProduct(productData).unwrap();
      console.log("Product added successfully:", response);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Flex>
      <Col>
        <PHForm onSubmit={onSubmit}>
          <Row className="gap-5">
            <PHInput label="name" name="name" type="text" />
            <PHInput label="Brand" name="brand" type="text" />
          </Row>

          <Row className="gap-5">
            <PHSelect
              label="Category"
              name="category"
              options={categoryOptions}
            />

            <PHInput label="Price" name="price" type="number" />

            <PHInput label="Quantity" name="quantity" type="number" />
          </Row>
          <PHTextArea name="description" label="Product Description" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateProduct;
