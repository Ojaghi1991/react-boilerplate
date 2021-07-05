import React, { useRef, useEffect } from "react";
import { useField } from "formik";
import { Input } from "antd";

import { mapHelper } from "helpers";

import StyleWrapper from "./form.style";

export default ({ formik, label, afterChange, ...props }: any): JSX.Element => {
  const [field, meta] = useField(props);
  const inputRef = useRef(null);

  const { error, touched, value } = meta;
  const { name } = props;
  const { setFieldValue } = formik;

  useEffect(() => {
    // @ts-ignore
    const searchBox = new window.google.maps.places.Autocomplete(
      inputRef.current.input,
      { types: ["address"], componentRestrictions: { country: "ir" } }
    );

    searchBox.addListener("place_changed", () => {
      const place = searchBox.getPlace();
      const result = mapHelper(place, true) || undefined;
      setFieldValue(name, result);
      if (afterChange) afterChange(result);
    });
  }, []);

  const handleBlur = () => {
    if (typeof value !== "object") {
      setFieldValue(name, undefined);
      if (afterChange) afterChange(undefined);
    }
  };

  return (
    <StyleWrapper className="input text-input">
      {label && <label htmlFor={name}>{label}</label>}

      <Input
        id={name}
        data-test-id={name}
        {...props}
        {...field}
        autoComplete="off"
        ref={inputRef}
        value={typeof value === "object" ? value?.formatted_address : value}
        onBlur={handleBlur}
      />

      {touched && error && (
        <div className="text-danger">
          <span className="text-danger--text">{error}</span>
        </div>
      )}
    </StyleWrapper>
  );
};
