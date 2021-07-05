import React, { useState } from "react";
import { Upload, Spin, message } from "antd";
import { useField } from "formik";

import StyleWrapper from "./form.style";

export default ({
  formik,
  fileType,
  allowedTypes = ["image/jpeg", "image/png"],
  imageUrl = "",
  showDefaultImage = false,
  loading = false,
  maxImageSize = 300,
  maxCount = 1,
  uploadButtonText,
  uploadDescription,
  onCustomRequest,
  ...props
}: any): JSX.Element => {
  const [state, setState] = useState({
    customImageUrl: "",
    customLoading: false,
  });
  const [field, meta] = useField(props);
  const { name } = props;
  const { error, touched } = meta;
  const { customImageUrl, customLoading } = state;

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const beforeUpload = (file) => {
    const isAllowed = allowedTypes.includes(file.type);
    const isFileSmall = file.size / 1024 / 1024 < maxImageSize;

    if (!isAllowed) {
      const errorMessage = allowedTypes.reduce(
        (str, type) => str.concat(type, ", "),
        "You can only upload "
      );
      message.error(errorMessage.concat("file types!"));
      return false;
    }

    if (!isFileSmall) {
      message.error(`Image must smaller than ${maxImageSize}MB!`);
      return false;
    }

    return isAllowed && isFileSmall;
  };

  const onChange = ({ file }) => {
    if (fileType === "image")
      getBase64(file.originFileObj, (img) =>
        setState({
          customImageUrl: img,
          customLoading: false,
        })
      );

    if (formik) {
      const { setFieldValue } = formik;
      setFieldValue(name, file.originFileObj);
      if (fileType !== "image") return setFieldValue("fileName", file.name);
    }
    return false;
  };

  return (
    <StyleWrapper>
      <Upload
        id={name}
        name={name}
        {...props}
        {...field}
        beforeUpload={beforeUpload}
        maxCount={maxCount}
        showUploadList={false}
        onChange={onChange}
        customRequest={(e) => onCustomRequest || e}
      >
        {showDefaultImage && (
          <div className="upload--image-box">
            <Spin spinning={loading || customLoading}>
              {imageUrl || customImageUrl ? (
                <img
                  src={imageUrl || customImageUrl}
                  alt={name}
                  style={{ width: "100%" }}
                />
              ) : (
                /* add default images */
                <div />
              )}
            </Spin>
          </div>
        )}
        {uploadButtonText && (
          <div className="upload--upload-button">{uploadButtonText}</div>
        )}
        {uploadDescription && (
          <span className="upload--upload-details">{uploadDescription}</span>
        )}
        {touched && error && error[name] && (
          <div className="text-danger">
            <span className="text-danger--text">{error[name]}</span>
          </div>
        )}
      </Upload>
    </StyleWrapper>
  );
};
