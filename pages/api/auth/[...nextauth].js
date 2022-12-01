import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const useSecureCookies = process.env.NEXTAUTH_URL.startsWith("https://");
const cookiePrefix = useSecureCookies ? "__Secure-" : "";
const hostName = new URL(process.env.NEXTAUTH_URL).hostname;

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [],
    secret: process.env.SECRET,

    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    cookies: {
        sessionToken: {
            name: `${cookiePrefix}next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: useSecureCookies,
                domain: hostName == "localhost" ? hostName : "." + hostName, // add a . in front so that subdomains are included
            },
        },
    },
    callbacks: {
        async session({ session, token, user }) {
            console.log('session info', token, user)
            session.user.roll = user.roll;
            return session;
        },
    },
    debug: process.env.NODE_ENV !== "production",
});
