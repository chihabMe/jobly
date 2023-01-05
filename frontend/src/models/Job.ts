import Tag from "./Tag";

interface Job {
  title: string;
  introduction: string;
  description: string;
  slug: string;
  location: string;
  since: string;
  salary: number;
  positions: number;
  bookMarked: boolean;
  applied: boolean;
  company: string;
  companySlug: string;
  tags: Tag[];
}
export default Job;
