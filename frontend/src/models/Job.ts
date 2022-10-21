import Tag from "./Tag";

export default interface {
    title: string;
    description: string;
    slug: string;
    upVotes: number;
    downVotes: number;
    companyName: string;
    tags: Tag[];
}