
  interface User {
    name: string;
    email: string;
    slug:string;
    image:string;
    cv:string;
    type:"COMPANY"|"EMPLOYEE";
    location:string;
    phone:string;
    appliedCount:number;
    rejectedCount:number;

}
export default  User;