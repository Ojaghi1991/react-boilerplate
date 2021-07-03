import React from "react";
import { useField } from "formik";
import { Radio } from "antd";

import StyleWrapper from "./form.style";

export default ({
  button,
  formik,
  label,
  options,
  ...props
}: any): JSX.Element => {
  const [field, meta] = useField(props);

  const { setFieldValue } = formik;
  const { error, touched } = meta;
  const { name } = props;

  const Component = button ? Radio.Button : Radio;

  return (
    <StyleWrapper className="input text-input">
      {label && <label htmlFor={name}>{label}</label>}

      <Radio.Group
        id={name}
        data-test-id={name}
        {...props}
        {...field}
        onChange={(event) => setFieldValue(name, event.target.value)}
      >
        {options.map(({ key, title }: any) => (
          <Component key={key} value={key}>
            {title}
          </Component>
        ))}
      </Radio.Group>

      {touched && error && (
        <div className="text-danger">
          <span className="text-danger--text">{error}</span>
        </div>
      )}
    </StyleWrapper>
  );
};
