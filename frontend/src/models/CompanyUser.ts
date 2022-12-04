import User from "./User";

interface CompanyUser extends User{
    name: string;
    email: string;
    slug:string;

    image:string;
    website:string;

    rating :number;
    numberOfRaters:number;
    description:string;
    type:"COMPANY"|"EMPLOYEE";
    location:string;
    phone:string;
    numberOfEmployees:number;
    numberOfOpenJobs:number;
}
export default   CompanyUser