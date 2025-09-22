export type ProposalWithDetails = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  citizen: {
    name: string;
    region: {
      name: string;
    } | null;
  } | null;
  subcategory: {
    name: string;
    sector: {
      name: string;
    } | null;
  } | null;
};