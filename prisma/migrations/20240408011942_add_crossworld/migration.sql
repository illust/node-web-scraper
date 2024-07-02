-- CreateTable
CREATE TABLE "crossworld" (
    "id" SERIAL NOT NULL,
    "issue" INTEGER NOT NULL,
    "content" TEXT[],

    CONSTRAINT "crossworld_pkey" PRIMARY KEY ("id")
);
