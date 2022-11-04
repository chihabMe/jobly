import Tag from "./Tag";

export default interface {
    title: string;
    description: string;
    slug: string;
    location:string,
  bookMarked:boolean;
    upVotes: number;
    downVotes: number;
    companyName: string;
    tags: Tag[];
}