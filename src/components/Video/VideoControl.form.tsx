import React from "react";
import { Formik, Form } from "formik";

import { Select } from "components/Form";

export default (props: any): JSX.Element => {
  const { inputs, outputs, onSubmit, onSelectInput, onSelectOutput } = props;
  const handleSubmit = (event: any, formik: any) => {
    onSubmit(event);
    formik.resetForm({ message: "" });
  };

  return (
    <Formik validateOnMount initialValues={{}} onSubmit={handleSubmit}>
      {(formik) => (
        <Form className="margin-t-50">
          <Select
            label="Microphone"
            formik={formik}
            name="input_select"
            placeholder="Select Input"
            options={inputs}
            onChange={onSelectInput}
          />
          <Select
            formik={formik}
            label="Speaker"
            name="output_select"
            placeholder="Select Output"
            options={outputs}
            onChange={onSelectOutput}
          />
        </Form>
      )}
    </Formik>
  );
};
