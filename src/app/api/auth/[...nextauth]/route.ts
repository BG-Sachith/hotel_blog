import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import prismadb from '@/src/util/prismadb';

let maxAge = 86400;

const handlers = NextAuth({
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      async authorize(credentials: any, req) {
        // check user existance
        // console.log(
        //   'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        // );
        const { email } = credentials;
        let result: any = await prismadb.user.findUnique({
          where: { email: email },
          include: { profile: { select: { bio: true } } },
        });
        const { password } = result;

        // check user existance
        // let result = await signIn_({ email: credentials.email });
        // console.log(req);
        // console.log(credentials);
        // console.log(
        //   'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        // );
        if (!result) {
          throw new Error('No user Found with Email Please Sign Up...!');
        }
        // compare()
        const checkPassword = await compare(
          credentials.password,
          password + ''
        );
        // incorrect password
        if (!checkPassword || email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        maxAge = req.body?.rememberPassword == true ? 30 * 24 * 60 * 60 : 86400;
        // console.log(
        //   'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrx'
        // );
        // console.log(result);
        return result;
      },
      credentials: {},
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: maxAge,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: maxAge,
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log(
      //   'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu'
      // );
      // console.log('token ->' + JSON.stringify(token));
      // console.log('user ->' + JSON.stringify(user));
      // console.log(
      //   'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu'
      // );
      if (user) {
        token = { accessToken: { ...token }, user: { ...user } };
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      let { user }: any = token;
      // console.log(
      //   'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'
      // );
      // console.log('session xxx->' + JSON.stringify(session));
      // console.log('token xxx->' + JSON.stringify(token));
      // console.log(user);
      // console.log(
      //   'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'
      // );

      // session.accessToken = token.accessToken;
      session.user = user;
      // delete session.user.image;
      return session;
    },
  },
});

export { handlers as GET, handlers as POST };
