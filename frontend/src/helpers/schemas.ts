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
    .oneOf([yup.ref("password"), "passwords must match"])
    .required("a password confirmation field is required"),
});
