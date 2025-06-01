-- CreateTable
CREATE TABLE "PhysicalAssessmentSchedule" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "time" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "personalId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',

    CONSTRAINT "PhysicalAssessmentSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PhysicalAssessmentSchedule" ADD CONSTRAINT "PhysicalAssessmentSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalAssessmentSchedule" ADD CONSTRAINT "PhysicalAssessmentSchedule_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
