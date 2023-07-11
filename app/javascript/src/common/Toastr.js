import { message } from "antd";

// message.config({
//   maxCount: 1,
// });

const showToastr = successMessage => {
  message.success({
    content: successMessage,
  });
};

const isError = e => e && e.stack && e.message;

const showErrorToastr = error => {
  const errorMessage = isError(error) ? error.message : error;
  message.error({ content: errorMessage });
};

const Toastr = {
  success: showToastr,
  error: showErrorToastr,
};

export default Toastr;
