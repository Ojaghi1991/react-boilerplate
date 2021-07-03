import React from "react";
import { Formik, Form } from "formik";

import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  Submit,
  Switch,
  Textarea,
  TimePicker,
  Upload,
} from "components";

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
            <Radio
              formik={formik}
              name="radio"
              label="Date"
              options={[
                { key: "today", title: "Today" },
                { key: "week", title: "This Week" },
                { key: "month", title: "This Month" },
                { key: "range", title: "Date Range" },
              ]}
            />
            <Switch formik={formik} label="Switch" name="switch" />
            <DatePicker
              formik={formik}
              name="date_picker"
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm a"
              placeholder="Select preferred date and time"
            />
            <TimePicker
              formik={formik}
              name="time_picker"
              size="large"
              showNow={false}
            />
            <InputNumber
              formik={formik}
              name="input_number"
              label="Input Number"
            />
            <Upload
              fileType="image"
              formik={formik}
              listType="picture-card"
              loading={false}
              multiple={false}
              name="image"
              showDefaultImage
              uploadButtonText="Add Image"
            />
            <Submit formik={formik} label="Submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};
