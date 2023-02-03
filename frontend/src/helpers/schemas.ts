import * as yup from "yup";
import "yup-phone";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, " use more than 6 characters ")
    .required("Required"),
});

export const registrationSchema = yup.object().shape({
  username: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "use more than 6 characters ")
    .required("Required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("Required"),
});

export const companyProfileEditSchema = yup.object().shape({
  name: yup.string(),
  description: yup
    .string()
    .min(50, "  use more than 50 character to describe your company")
    .max(
      500,
      "you  can not use more than 500 characters to describe your company"
    ),
  numberOfEmployees: yup
    .number()
    .min(1, "your have to have more than one employee in your company"),
  website: yup.string().url("you have to use a valid website link"),
  phone: yup.string(),
});

export const changePasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .notOneOf(
      [yup.ref("currentPassword"), null],
      "your new password must not be the same as your current password"
    )
    .min(6, " use more than 6 characters")
    .required("Required"),
  reNewPassword: yup
    .string()
    .min(6, " use more than 6 characters")
    .oneOf([yup.ref("newPassword"), null], "password don't match")
    .required("Required"),
  currentPassword: yup.string().required("Required"),
});
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Required")
    .phone(undefined, false, "The phone number entered is not valid"),
  // .matches(phoneRegExp, "The phone number entered is not valid."),
});
