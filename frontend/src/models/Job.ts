import Tag from "./Tag";

export default interface {
    title: string;
    introduction:string;
    description: string;
    slug: string;
    location:string;
    since :string;
    salary:number;
    positions:number;
    bookMarked:boolean;
    applied:boolean;
    company: string;
    tags: Tag[];
}