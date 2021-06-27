import React from "react";
import { Link } from "react-router-dom";

import { userAction } from "redux/actions";
import { connectHelper } from "helpers";

const handleAction = (promise: any) => promise(userAction.loadAll());

const connect = connectHelper((state) => ({
  users: state.user,
}));

type Props = {
  promise: any;
  users: any;
};

const Dashboard = ({
  promise,
  users: { data = [], fetching = true },
}: Props) => (
  <div>
    <Link to="/about">About Page</Link>
    <button type="button" onClick={() => handleAction(promise)}>
      call Action
    </button>
    <h3>Users Data:</h3>
    {fetching ? (
      <div>Loading...</div>
    ) : (
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    )}
  </div>
);

export default connect(Dashboard);
