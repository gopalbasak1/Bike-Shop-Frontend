import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  className?: string;
};

const PHInput = ({ type, name, label, disabled, className }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            {" "}
            <Input
              {...field}
              type={type}
              id={name}
              disabled={disabled}
              size="large"
              className={className}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
