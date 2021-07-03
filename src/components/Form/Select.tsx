import React from "react";
import { useField } from "formik";
import { Select } from "antd";

import StyleWrapper from "./form.style";

export default ({
  formik,
  disabled,
  label,
  afterChange,
  options = {},
  ...props
}: any): JSX.Element => {
  const [field, meta] = useField(props);

  const { setFieldValue } = formik;
  const { error, touched, value } = meta;
  const { name } = props;
  const { data = [], key, title } = options;

  const handleChnage = (option) => {
    setFieldValue(name, option);
    if (afterChange) afterChange(option);
  };

  return (
    <StyleWrapper
      className={`input select-input ${value ? "hasValue" : ""} ${
        touched && error ? "hasError" : ""
      } ${disabled ? "disabled" : ""}`}
    >
      {label && (
        <label data-test-label-id={name} htmlFor={name}>
          {label}
        </label>
      )}

      <Select
        id={name}
        data-test-id={name}
        {...props}
        {...field}
        disabled={disabled}
        getPopupContainer={(trigger) => trigger.parentNode}
        onChange={handleChnage}
      >
        {data.map((item: any) => (
          <Select.Option
            data-test-option-id={item[key]}
            key={item[key]}
            title={item[title]}
            value={item[key]}
          >
            {item[title]}
          </Select.Option>
        ))}
      </Select>

      {touched && error && (
        <div className="text-danger">
          <span className="text-danger--text">{error}</span>
        </div>
      )}
    </StyleWrapper>
  );
};
