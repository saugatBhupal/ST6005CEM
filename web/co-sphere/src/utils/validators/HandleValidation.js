import {
  validateDateOfBirth,
  validateEmail,
  validateFullname,
  validatePassword,
  validatePhoneNumber,
} from "./AllInputValidators";

export const handleValidation = (value, type) => {
  let message = "";
  switch (type) {
    case "email":
      message = validateEmail(value);
      break;
    case "password":
      message = validatePassword(value);
      break;
    case "fullname":
      message = validateFullname(value);
      break;
    case "phone":
      message = validatePhoneNumber(value);
      break;
    case "dob":
      message = validateDateOfBirth(value);
      break;
    default:
      break;
  }

  return message;
};
