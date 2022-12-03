
interface EmployeeUser{
    name: string;
    email: string;
    slug:string;
    image:string;
    cv:string;
    type:"COMPANY"|"EMPLOYEE";
    location:string;
    phone:string;
    appliedJobs:number;
    rejectedJobs:number;
    bookMarkedJobs:number;
}
export default   EmployeeUser