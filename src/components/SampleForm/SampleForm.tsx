import React from "react";
import { Formik, Form } from "formik";

import { Input, Textarea, Checkbox, Select, Submit } from "components";

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
            <Select
              formik={formik}
              name="select_options"
              options={{
                data: [
                  { key: 1, title: "Option #1" },
                  { key: 2, title: "Option #2" },
                  { key: 3, title: "Option #3" },
                ],
                key: "key",
                title: "title",
              }}
            />
            <Submit formik={formik} label="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
