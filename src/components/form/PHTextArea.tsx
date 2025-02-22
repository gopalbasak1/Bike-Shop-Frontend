import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TTextAreaProps = {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
};

const PHTextArea = ({
  name,
  label,
  placeholder,
  className,
}: TTextAreaProps) => {
  const { control } = useFormContext();

  return (
    <Form.Item label={label}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input.TextArea
              {...field}
              placeholder={placeholder}
              className={className}
            />
            {fieldState.error && (
              <span style={{ color: "red" }}>{fieldState.error.message}</span>
            )}
          </>
        )}
      />
    </Form.Item>
  );
};

export default PHTextArea;
