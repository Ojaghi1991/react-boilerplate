import React, { FC } from "react";
import { connectHelper } from "helpers";
import { sampleAction } from "redux/actions";

const connect = connectHelper();
const Me: FC = (props: any) => {
  const handleSetToken = () => {
    const {
      dispatch,
      history: { push },
    } = props;
    dispatch(sampleAction.sample(""));
    push("/");
  };
  return (
    <form>
      werwe
      <button type="button" onClick={handleSetToken}>
        Login Out
      </button>
    </form>
  );
};

export default connect(Me);
