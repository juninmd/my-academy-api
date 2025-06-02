-- AlterTable
ALTER TABLE "PersonalClassSchedule" ADD COLUMN     "personalTrainingPlanId" INTEGER;

-- CreateTable
CREATE TABLE "PersonalTrainingPlan" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "personalId" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "sessionsPerWeek" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "PersonalTrainingPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonalClassSchedule" ADD CONSTRAINT "PersonalClassSchedule_personalTrainingPlanId_fkey" FOREIGN KEY ("personalTrainingPlanId") REFERENCES "PersonalTrainingPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTrainingPlan" ADD CONSTRAINT "PersonalTrainingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalTrainingPlan" ADD CONSTRAINT "PersonalTrainingPlan_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
