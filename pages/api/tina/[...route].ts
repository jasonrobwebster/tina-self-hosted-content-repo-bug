import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from "tinacms-authjs";
import { LocalBackendAuthProvider, TinaNodeBackend } from "@tinacms/datalayer";
import { NextApiRequest, NextApiResponse } from "next";

import databaseClient from "../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }),
  databaseClient,
});

export default async function routes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return handler(req, res);
}
