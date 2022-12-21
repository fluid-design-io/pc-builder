import { GraphQLClient } from "graphql-request";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const client = new GraphQLClient(baseURL + "/api/graphql", {
  credentials: "include",
});
