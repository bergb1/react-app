export default interface GraphQLResponse {
  data: any;
  errors: { message: string }[];
}
