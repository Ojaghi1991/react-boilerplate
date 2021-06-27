import React, { FC } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userAction } from "redux/actions";

const handleAction = (props: any) => {
  const { dispatch } = props;
  dispatch(userAction.loadAll());
};

const Dashboard: FC = (props) => (
  <div>
    <Link to="/">Dashboard</Link>
    <button type="button" onClick={() => handleAction(props)}>
      About Page
    </button>
  </div>
);

export default connect()(Dashboard);
