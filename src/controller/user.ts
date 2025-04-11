import { PrismaClient } from "@prisma/client";
import {jwt} from "@elysiajs/jwt";
import { env } from "bun";
const prisma = new PrismaClient();


export const UserController = {
    async createUser({ body }: { body: { name: string } }) {
        const user = await prisma.user.create({
            data: {
                name: body.name
            },
        });

        
        return  user;
    },
    async signin({ body, jwt }: { body: { id: string }, jwt: any }) {
        const user = await prisma.user.findUnique({
            where: {
                id: body.id,
                status: false
            },
        });
        if (user){
            await prisma.user.update({
            where: { id: body.id },
            data: { status: true },
        });
    }

        if (!user) {
            throw new Error("User not found");
        }

        const token = await jwt.sign(user);
        return { token } ;
    }
};