import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

export const getAuthSession = async (ctx) => {
  return await unstable_getServerSession(ctx.req, ctx.res, authOptions);
};
