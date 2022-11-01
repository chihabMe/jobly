import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "src/components/ui/Button";
import PageIsLoading from "src/components/ui/PageIsLoading";
import UseFetch from "src/hooks/use-fetch";
import User from "src/models/User";
import { InputType } from "zlib";
import ProfileTitle from "./ProfileTitle";

const ProfileResume = ({ user }: { user: User }) => {
  const { isLoading, data, error, request, status } = UseFetch();
  const uploadInput = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<any>("");
  const [selected, setSelected] = useState(false);
  const onSubmitUpdateResume = (e: FormEvent) => {
    e.preventDefault();
  };
  const updateResume = ()=>{
    const formData = new FormData();
    formData.set("cv",resume)
    request("PUT","/api/profile/update",formData,null)
    setSelected(false)
    
  }
  const uploadClickHandler = () => {
    uploadInput.current?.click();

  };
  const resumeChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setResume(e.target.files[0]);
    setSelected(true);
  };
  useEffect(() => {
    console.log(selected)
   if(selected)updateResume()
  }, [selected]);
  

  return (
    <>
      <ProfileTitle>resume</ProfileTitle>
      <form onSubmit={onSubmitUpdateResume}>
        <input

          onChange={resumeChangeHandler}
          hidden
          type="file"
          ref={uploadInput}
        />
        </form>
        <Button
          onClick={uploadClickHandler}
          className={`  w-full border ${
            selected && "border-primary"
          }   border-white capitalize h-10 md:h-18   justify-center font-bold text-primary hover:bg-gray-100 transition-all duration-200 hover:border-primary `}
          text=""
        >
          { !isLoading && (user?.cv ? "update your resume" : "upload your cv")}
          { isLoading && <PageIsLoading />}
        </Button>
      <div className="w-full flex justify-center ">
        <a href={user?.cv} target="blank">
          <Button
            className="bg-primary px-10 hover:opacity-90 transition-all duration-150"
            text="open resume"
          />
        </a>
      </div>
    </>
  );
};

export default ProfileResume;
