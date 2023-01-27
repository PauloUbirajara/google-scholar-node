export type UserDetails = {
  details: {
    name: string;
    id: string;
    hindex: string;
    i10index: string;
  };
  citations: { year: string; citations: number }[];
};
