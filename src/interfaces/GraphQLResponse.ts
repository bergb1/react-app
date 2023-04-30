export default interface GraphQLResponse {
  data: Object;
  errors: { message: string }[];
}
