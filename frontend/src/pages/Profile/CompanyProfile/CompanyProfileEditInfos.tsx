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
  const [form, setForm] = useState({
    name: profile?.name || "",
    description: profile?.description || "",
    numberOfEmployees: profile?.numberOfEmployees || 0,
    website: profile?.website || "",
    phone: profile?.phone || "",
  });
  const onChangeHandler = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setForm({ ...form, [target.name]: target.value });
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateProfile(form).unwrap();
    } catch {}
  };
  return (
    <form
      onSubmit={submitHandler}
      action=""
      className="w-full max-w-2xl mx-auto flex flex-col gap-4"
    >
      <Controller
        text="company name"
        htmlFor="company name"
        error={isError && data ? data["name"] : []}
      >
        <Input
          type="text"
          placeholder="company name"
          name="name"
          onChange={onChangeHandler}
          value={form.name}
        />
      </Controller>

      <Controller
        text="description"
        htmlFor="description"
        error={isError && data ? data["description"] : []}
      >
        <TextInput
          placeholder="description"
          name="description"
          onChange={onChangeHandler}
          value={form.description}
        />
      </Controller>
      <Controller
        text="website"
        htmlFor="website"
        error={isError && data ? data["website"] : []}
      >
        <Input
          type="url"
          placeholder="www.website.com"
          name="website"
          onChange={onChangeHandler}
          value={form.website}
        />
      </Controller>

      <Controller
        text="phone"
        htmlFor="phone"
        error={isError && data ? data["phone"] : []}
      >
        <Input
          type="text"
          placeholder="12345785"
          name="phone"
          onChange={onChangeHandler}
          value={form.phone}
        />
      </Controller>

      <Controller
        text="number of employees"
        htmlFor="numberOfEmployees"
        error={isError && data ? data["number_of_employees"] : []}
      >
        <Input
          type="number"
          min="1"
          placeholder="number of employees"
          name="numberOfEmployees"
          onChange={onChangeHandler}
          value={form.numberOfEmployees.toString()}
        />
      </Controller>
      <Button className="!capitalize !text-sm mt-4">
        {!isLoading && "save and continue"}
        {isLoading && <PageIsLoading />}
      </Button>
    </form>
  );
};

export default CompanyProfileEditInfos;
