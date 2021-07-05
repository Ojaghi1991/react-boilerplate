import React from "react";
import { useField } from "formik";
import { TimePicker } from "antd";
import moment from "moment";

import StyleWrapper from "./form.style";

export default ({ formik, label, ...props }: any): JSX.Element => {
  const [{ value, ...field }, meta] = useField(props);

  const { setFieldValue } = formik;
  const { error, touched } = meta;
  const { name, format = "HH:mm:ss" } = props;

  return (
    <StyleWrapper className="input text-input">
      {label && <label htmlFor={name}>{label}</label>}

      <TimePicker
        id={name}
        data-test-id={name}
        {...props}
        {...field}
        {...(value ? { value: moment(value, format) } : {})}
        onChange={(_: any, time: any) => setFieldValue(name, time)}
        getPopupContainer={(trigger) => trigger.parentNode}
      />

      {touched && error && (
        <div className="text-danger">
          <span className="text-danger--text">{error}</span>
        </div>
      )}
    </StyleWrapper>
  );
};
