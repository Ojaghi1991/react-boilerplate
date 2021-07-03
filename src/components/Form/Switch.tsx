import React from "react";
import { useField } from "formik";
import { Switch } from "antd";

import StyleWrapper from "./form.style";

export default ({ formik, ...props }: any): JSX.Element => {
  const [{ value, ...field }, meta] = useField(props);

  const { setFieldValue } = formik;
  const { error, touched } = meta;
  const { name } = props;

  return (
    <StyleWrapper className="input checkbox-input">
      <Switch
        id={name}
        data-test-id={name}
        {...props}
        {...field}
        checked={value}
        type="checkbox"
        onChange={(option) => setFieldValue(name, option)}
      />
      {touched && error && (
        <div className="text-danger">
          <span className="text-danger--text">{error}</span>
        </div>
      )}
    </StyleWrapper>
  );
};
