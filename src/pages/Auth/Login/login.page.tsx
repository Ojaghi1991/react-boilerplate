import React, { useState, FC } from "react";
import { connectHelper } from "helpers";
import { sampleAction } from "redux/actions";

const connect = connectHelper();
const Login: FC = (props: any) => {
  const [token, setToken] = useState("");
  const handleSetToken = () => {
    const {
      dispatch,
      history: { push },
    } = props;
    dispatch(sampleAction.sample(token));
    push("/me");
  };
  return (
    <form>
      <input
        name="token"
        type="text"
        onChange={(e) => setToken(e.target.value)}
      />
      <button type="button" onClick={handleSetToken}>
        Login
      </button>
    </form>
  );
};

export default connect(Login);
