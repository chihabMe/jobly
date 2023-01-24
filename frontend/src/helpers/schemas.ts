import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("please use a valid email")
    .required("an email field is required"),
  password: yup
    .string()
    .min(6, "you must use more than 6 characters ")
    .required("a password field is required"),
});

export const registrationSchema = yup.object().shape({
  username: yup.string().required("a username field is required"),
  email: yup
    .string()
    .email("please use a valid email")
    .required("an email field is required"),
  password: yup
    .string()
    .min(6, "you must use more than 6 characters ")
    .required("a password field is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("a password confirmation field is required"),
});

export const companyProfileEditSchema = yup.object().shape({
  name: yup.string(),
  description: yup
    .string()
    .min(50, "you have to use more than 50 character to describe your company")
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
    .min(6, "please use more than 6 characters")
    .required("this field is required"),
  reNewPassword: yup
    .string()
    .min(6, "please use more than 6 characters")
    .oneOf([yup.ref("newPassword"), null], "password don't match")
    .required("this field is required"),
  currentPassword: yup.string().required("this field is required"),
});
