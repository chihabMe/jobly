import camelize from "camelize-ts";
import { Form, Formik, FormikBag, FormikErrors } from "formik";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Button from "src/components/ui/Button";
import Controller from "src/components/ui/Controller";
import Input from "src/components/ui/Input";
import PageIsLoading from "src/components/ui/PageIsLoading";
import TextInput from "src/components/ui/TextInput";
import { companyProfileEditSchema } from "src/helpers/schemas";
import CompanyUser from "src/models/CompanyUser";
import {
  ResponseError,
  useUpdateCompanyProfileMutation,
} from "src/store/features/companyProfileApit";

const CompanyProfileEditInfos = ({ profile }: { profile: CompanyUser }) => {
  const [updateProfile, { isLoading, isError, error, data }] =
    useUpdateCompanyProfileMutation();
  const initialState = {
    name: profile?.name || "",
    description: profile?.description || "",
    numberOfEmployees: profile?.numberOfEmployees || 0,
    website: profile?.website || "",
    phone: profile?.phone || "",
  };
  return (
    <div>
      <Formik
        validationSchema={companyProfileEditSchema}
        initialValues={initialState}
        onSubmit={async (values, actions) => {
          try {
            const res = await updateProfile(values).unwrap();
          } catch (err) {
            const data = (err as { status: number; data: ResponseError })
              .data as ResponseError;
            actions.setErrors(camelize(data));
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        {(props) => (
          <Form
            action=""
            className="w-full max-w-2xl mx-auto flex flex-col gap-4"
          >
            <Input type="text" label="company name" name="name" />
            {/* <TextInput placeholder="description" name="description" /> */}
            <Input
              type="url"
              label="company website"
              placeholder="www.website.com"
              name="website"
            />

            <Input
              type="text"
              label="phone number"
              placeholder="12345785"
              name="phone"
            />

            <Input
              type="number"
              placeholder="number of employees"
              label="number of employees"
              name="numberOfEmployees"
            />
            <Button
              disabled={props.isSubmitting}
              className={`!capitalize !text-sm h-12 rounded-sm 
               `}
            >
              {!isLoading && "save  "}
              {isLoading && <PageIsLoading size={20} />}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyProfileEditInfos;
