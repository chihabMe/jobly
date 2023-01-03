import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import User from "src/models/User";
import Image from "next/image";
import Button from "src/components/ui/Button";
import UseFetch from "src/hooks/use-fetch";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { authActions } from "src/store/slices/authSlice";
import useAppDispatch from "src/hooks/useAppDispatch";
import { useChangeProfileImageMutation } from "src/store/features/profileApi";
import { useChangeCompanyProfileCoverMutation } from "src/store/features/companyProfileApit";
import CompanyUser from "src/models/CompanyUser";
import Alert from "src/components/ui/Alert";

const CompanyCoverUpdate = ({ user }: { user: CompanyUser }) => {
  const [changeProfile, { isError, isSuccess, isLoading }] =
    useChangeCompanyProfileCoverMutation();
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  const fileInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const imageChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (e.target.files) {
      formData.append("cover", e.target.files[0]);
      try {
        await changeProfile(formData).unwrap();
      } catch {
        console.log("error");
      }
    }
  };
  return (
    <section className="flex flex-col items-center gap-4">
      {isSuccess && <Alert body="cover updated successfully" />}
      <div className=" mx-auto w-20 h-20 md:w-32 md:h-32 rounded-full relative">
        {/* <Image className="rounded-full" src={user?.cover || ""} layout="fill" /> */}
      </div>

      <form onSubmit={onSubmitHandler}>
        <input
          onChange={imageChangeHandler}
          ref={fileInput}
          name="profile-image-upload"
          id="profile-image-upload"
          type="file"
          className="hidden opacity-0"
          hidden
        />
        <label>
          <Button
            onClick={() => {
              fileInput.current?.click();
            }}
            className=" rounded-sm hover:bg-bg border   bg-primary border-primary hover:text-primary  h-12 w-52       "
          >
            {!isLoading && "update the cover image"}
            {isLoading && <PageIsLoading size={20} color="white" />}
          </Button>
        </label>
      </form>
    </section>
  );
};

export default CompanyCoverUpdate;
