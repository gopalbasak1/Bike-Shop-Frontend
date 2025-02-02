import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field: { value, onChange, ...restField } }) => (
          <Form.Item label={label}>
            <DatePicker
              {...restField}
              size="large"
              style={{ width: "100%" }}
              value={value ? dayjs(value) : null} // Convert to dayjs object
              onChange={(date) => onChange(date ? date.toISOString() : null)} // Convert to ISO string
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
