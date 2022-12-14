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
import Alert from "src/components/ui/Alert";

const ProfileImage = ({ user }: { user: User }) => {
  const [changeProfile, { isError, isSuccess, isLoading }] =
    useChangeProfileImageMutation();
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
  };
  // const {request,isLoading,error,data,status} = UseFetch()
  const fileInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  // const dispatch = useAppDispatch()
  const imageChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files)
    // if(e.target.files)setImage(e.target.files[0])
    const formData = new FormData();
    if (e.target.files) {
      formData.append("image", e.target.files[0]);
      // request("PUT","api/profile/update",formData,null)
      try {
        await changeProfile(formData).unwrap();
      } catch {
        console.log("error");
      }
    }
  };
  // useEffect(()=>{
  // if(!isLoading && status==200)dispatch(authActions.loadUser())
  // console.log(!isLoading)
  // console.log(status)
  // },[status,isLoading])
  return (
    <section className="flex flex-col items-center gap-4">
      {isSuccess && <Alert body="image updated successfully" />}
      <div className=" mx-auto w-20 h-20 md:w-32 md:h-32 rounded-full relative">
        {/* <Image className="rounded-full" src={user?.image || ""} layout="fill" /> */}
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
            className="  hover:bg-bg border   bg-primary border-primary hover:text-primary  h-12 w-52       "
          >
            {!isLoading && "update the avatar image"}
            {isLoading && <PageIsLoading size={20} color="white" />}
          </Button>
        </label>
      </form>
    </section>
  );
};

export default ProfileImage;
