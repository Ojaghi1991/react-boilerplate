import axios from "axios";
import Cookies from "universal-cookie";
import FormData from "form-data";
import { isEmpty, isNumber } from "lodash";
import config from "config";

const cookies = new Cookies();

function createFormData(object: any, form = null, namespace = null) {
  const formData: any = form || new FormData();

  Object.keys(object).forEach((property) => {
    if (
      Object.hasOwnProperty.call(object, property) &&
      (!isEmpty(object[property]) || isNumber(object[property]))
    ) {
      const propertyResult = Number.isNaN(Number(property)) ? property : "";
      const formKey: any = namespace
        ? `${namespace}[${propertyResult}]`
        : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (
        typeof object[property] === "object" &&
        !(object[property] instanceof File)
      ) {
        createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
  });
  return formData;
}

export default ({
  files: filesForm,
  params = {},
  url,
  token,
  ...rest
}: any) => {
  const parameters = rest;
  const authorization = token || cookies.get("application-api-token");

  if (filesForm) {
    const formData = createFormData(filesForm);
    parameters.data = formData;
  }

  const data = {
    data: {}, // Don't change it, used for supporting content-type
    headers: {
      ...(authorization ? { Authorization: `bearer ${authorization}` } : {}),
      "App-Platform": "web",
      Role: "psychologist",
    },
    method: "get",
    params,
    url: `${config.apiURL}${url}`,
    ...parameters,
  };

  return axios(data);
};
