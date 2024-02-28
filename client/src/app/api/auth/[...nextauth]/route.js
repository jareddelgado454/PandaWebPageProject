import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers : [
      GithubProvider ({
        clientId : process.env.GITHUB_CLIENTID,
        clientSecret : process.env.GITHUB_SECRETCLIENT
      }),
      CredentialsProvider ({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "Email" },
          password: { label: "Password", type: "password", placeholder: "Password" },
        },
        async authorize(credentials) {
           const user = {id:1, name : "Jared Delgado", email : "jared@gmail.com"};
           return user;
        },
      })
    ],
    secret : process.env.NEXT_AUTH_SECRET,
    session : {
      strategy : "jwt"
    },
    debugger : process.env.NODE_ENV === "development",

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

