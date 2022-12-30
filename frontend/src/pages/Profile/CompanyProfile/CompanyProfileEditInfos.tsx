import { Form, Formik } from "formik";
import React, { FormEvent, useState } from "react";
import Button from "src/components/ui/Button";
import Controller from "src/components/ui/Controller";
import Input from "src/components/ui/Input";
import PageIsLoading from "src/components/ui/PageIsLoading";
import TextInput from "src/components/ui/TextInput";
import CompanyUser from "src/models/CompanyUser";
import { useUpdateCompanyProfileMutation } from "src/store/features/companyProfileApit";

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
  const submitHandler = async (e: FormEvent) => {
    // e.preventDefault();
    // try {
    //   const res = await updateProfile(form).unwrap();
    // } catch {}
  };
  return (
    <div>
      <Formik
        initialValues={initialState}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form
            onSubmit={submitHandler}
            action=""
            className="w-full max-w-2xl mx-auto flex flex-col gap-4"
          >
            <Input type="text" placeholder="company name" name="name" />
            {/* <TextInput placeholder="description" name="description" /> */}
            <Input type="url" placeholder="www.website.com" name="website" />

            <Input type="text" placeholder="12345785" name="phone" />

            <Input
              type="number"
              placeholder="number of employees"
              name="numberOfEmployees"
            />
            <Button className="!capitalize !text-sm mt-4">
              {!isLoading && "save and continue"}
              {isLoading && <PageIsLoading />}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyProfileEditInfos;
