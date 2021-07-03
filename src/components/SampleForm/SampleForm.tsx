import React from "react";
import { Formik, Form } from "formik";
import { Button } from "antd";

import { Input, Textarea, Checkbox, Submit } from "components";

export default (props: any): JSX.Element => {
  const { initialValues, onSubmit } = props;

  return (
    <div>
      <Formik
        initialValues={{ first_name: "", description: "", ...initialValues }}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Input name="first_name" />
            <Textarea name="description" />
            <Checkbox name="is_checked" label="Check Mark" />

            <Submit formik={formik} label="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
