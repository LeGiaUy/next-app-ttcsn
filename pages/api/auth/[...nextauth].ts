import prisma from "@/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Mật khẩu",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Sai tài khoản hoặc mật khẩu");
                }
                

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user?.hashedPassword){
                    throw new Error("Sai tài khoản hoặc mật khẩu")
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if(!isCorrectPassword){
                    throw new Error("Sai tài khoản hoặc mật khẩu")
                }

                return user;
            }
        }),
    ],
    pages: {
        signIn: '/login'
    },
    debug: process.env.NODE_ENV === 'development',
    session : {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
};


export default NextAuth(authOptions)
    