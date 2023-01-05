interface CompanyReview {
  id: number;
  body: string;
  rate: number;
  user: string;
  helpfulWithYes: number;
  helpfulWithNo: number;
  created: Date;
  updated: Date;
}
export default CompanyReview;
