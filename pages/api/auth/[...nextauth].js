



// Go to the documentation ==> https://next-auth.js.org/providers/credentials

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
      console.log('credentials: ', credentials);


      try {
        const res = await axios?.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
              email: credentials.email,
              password: credentials.password,
            }
          );
          
          console.log('process.env.NEXT_PUBLIC_API_URL: ', process.env.NEXT_PUBLIC_API_URL);
          console.log('res: ', res);

          if (res.status == 200) {
            return { token: res?.data?.token, user: res?.data };
          }
        } catch (error) {
          throw new Error(error.response?.data?.message || "Login failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours session expiry time
  },
  jwt: {
    maxAge: 8 * 60 * 60, // 8 hours JWT expiry time
  },
  callbacks: {
    async jwt({ token, user }) {
      let newUser = user?.user?.data;
      if (newUser) {
        token.accessToken = newUser?.token;
        token.name = newUser?.name;
        token.id = newUser?.id;
        token.email = newUser?.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
