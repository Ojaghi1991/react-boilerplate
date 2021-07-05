import React from "react";
import { SampleForm } from "components";

const handleSubmit = (data: any) => {
  console.log("handleSubmit", data);
};
const Sample = () => (
  <div>
    <SampleForm onSubmit={handleSubmit} />
  </div>
);

export default Sample;
