import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import User from '@models/user';
import {connectToDatabase} from '@utils/database';

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      console.log("session", session);

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
        console.log("signIn", account, profile, user, credentials);
      try {
        await connectToDatabase();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        console.log("userExists", userExists);

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
          console.log("User created");
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }
