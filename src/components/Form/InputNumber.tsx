import React from "react";
import { useField } from "formik";
import { InputNumber } from "antd";

import StyleWrapper from "./form.style";

export default ({ formik, label, ...props }: any): JSX.Element => {
  const [field, meta] = useField(props);

  const { setFieldValue } = formik;
  const { error, touched } = meta;
  const { name } = props;

  const handleChange = (value: any) => {
    const { min, max, step } = props;
    if (
      typeof value === "number" &&
      (!min || value >= min) &&
      (!max || value <= max) &&
      (!step || value % step === 0)
    ) {
      setFieldValue(name, value);
    }
  };

  return (
    <StyleWrapper className="input text-input">
      {label && <label htmlFor={name}>{label}</label>}

      <InputNumber
        id={name}
        data-test-id={name}
        {...props}
        {...field}
        onChange={handleChange}
      />

      {touched && error && (
        <div className="text-danger">
          <span className="text-danger--text">{error}</span>
        </div>
      )}
    </StyleWrapper>
  );
};
