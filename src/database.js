import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
const prisma = new PrismaClient();

async function createRecord(){
    try {
        const crossworld = await prisma.crossworld.create({
            data:{
                issue: 1,
                content: ["既生瑜何生亮","特仑苏"]
            }
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials taken');
          }
        }
        throw error;
      }
}

console.log(createRecord());