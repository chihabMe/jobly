import { CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Input from "src/components/ui/Input";
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { phoneSchema } from "src/helpers/schemas";
import SettingsChangeCardWrapper from "src/pages/Settings/SettingsChangeCardWrapper";
import SettingsChangeLayout from "src/pages/Settings/SettingsChangeLayout";
import SettingsChangeTitle from "src/pages/Settings/SettingsChangeTitle";
import Button from "src/components/ui/Button";
import Link from "next/link";
import PageIsLoading from "src/components/ui/PageIsLoading";
import UseFetch from "src/hooks/use-fetch";
import { useRouter } from "next/router";
import {
  useGetEmployeeProfileQuery,
  useUpdateLocationMutation,
} from "src/store/features/employeeProfileApi";
import useAppSelector from "src/hooks/useAppSelector";
import EmployeeUser from "src/models/EmployeeUser";
interface InitialValueInterface {
  location: string;
}
const Location = () => {
  // const { data, request, status, isLoading, error } = UseFetch();
  const {
    data: profile,
    isSuccess: isProfileSuccess,
    isLoading: isProfileLoading,
  } = useGetEmployeeProfileQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: false,
  });

  const initialValue: InitialValueInterface = {
    location: profile?.location ?? "",
  };

  const [updateLocation, { data, error, isLoading, isSuccess }] =
    useUpdateLocationMutation();
  const router = useRouter();
  const handleChangeSubmit = async (body: InitialValueInterface) => {
    const data = new FormData();
    data.append("location", body.location);
    return await updateLocation({
      location: data,
    });
  };
  useEffect(() => {
    if (!isLoading && isSuccess) router.push("/settings");
  }, [isLoading]);
  if (isProfileLoading)
    return (
      <div className="w-full h-72 flex justify-center items-center">
        <PageIsLoading />
      </div>
    );
  return (
    <SettingsChangeCardWrapper>
      <CardHeader>
        <SettingsChangeTitle title="location" />
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValue}
          onSubmit={async (values, actions) => {
            const resData = await handleChangeSubmit(values);
            //@ts-ignore
            actions.setErrors(resData?.error.data);
          }}
        >
          {(props) => (
            <Form className="flex flex-col gap-4">
              <Input name="location" type="text" label="enter your location" />
              <div></div>
              <div className="py-4 flex gap-4 items-center justify-end">
                <Link href={"/settings"}>
                  <Typography className="   !bg-red-400   shadow  text-center  rounded-md cursor-pointer font-bold h-10 text-xs flex justify-center items-center  w-24 text-white">
                    cancel
                  </Typography>
                </Link>
                <Button className="w-24 text-center">
                  {isLoading ? <PageIsLoading size={10} /> : "change"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </SettingsChangeCardWrapper>
  );
};

Location.PageLayout = SettingsChangeLayout;
export default Location;
