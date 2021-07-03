import React from "react";
import { Formik, Form } from "formik";
import { Button } from "antd";

import { Input, Textarea } from "components/Form";

export default (props: any): JSX.Element => {
  const { initialValues, onSubmit } = props;

  return (
    <div>
      <div className="tabs-container">
        <Formik
          initialValues={{ first_name: "", description: "", ...initialValues }}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <Input name="first_name" />
              <Textarea name="description" />

              <div className="time-shift-bar time-shift-bar--footer">
                <Button
                  htmlType="submit"
                  className="primary-green primary-green--submit"
                  onClick={onSubmit}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
