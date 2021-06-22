import React, { FC } from "react";
import { connect } from "react-redux";
import { userAction } from "../../redux/actions";

const handleAction = (props: any) => {
  const { dispatch } = props;
  dispatch(userAction.loadAll());
};

const Dashboard: FC = (props) => (
  <div>
    <button type="button" onClick={() => handleAction(props)}>
      call Action
    </button>
  </div>
);

export default connect()(Dashboard);
