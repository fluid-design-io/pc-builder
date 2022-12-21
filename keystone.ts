import { config } from "@keystone-6/core";
import { lists } from "./src/keystone/schema";
import { withAuth, session } from "./src/keystone/auth";

// Next.js deploys need absolute path to sqlite db file
const dbFilePath = `${process.cwd()}/keystone.db`;
export default withAuth(
  config({
    db: {
      provider: "sqlite",
      url: `file:${dbFilePath}`,
    },
    lists,
    session,
  })
);
