import ActionTypes from "../actionTypes";

export function loadAll(params?: any) {
  return {
    type: ActionTypes.LOAD_ALL_USER,
    method: "get",
    url: "/users",
    params,
  };
}

export function load(id: string, params?: any) {
  return {
    method: "get",
    type: ActionTypes.LOAD_USER,
    url: `/users/${id}`,
    params,
  };
}

export function create(data: any) {
  return {
    method: "post",
    type: ActionTypes.CREATE_USER,
    url: "/users",
    data,
  };
}

export function update(id: string, data?: any) {
  return {
    method: "put",
    type: ActionTypes.UPDATE_USER,
    url: `/users/${id}`,
    data,
  };
}

export function remove(id: string) {
  return {
    method: "delete",
    type: ActionTypes.DELETE_USER,
    url: `/users/${id}`,
  };
}
