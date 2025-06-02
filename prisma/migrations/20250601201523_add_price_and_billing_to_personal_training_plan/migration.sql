-- AlterTable
ALTER TABLE "PersonalTrainingPlan" ADD COLUMN     "billingType" TEXT DEFAULT 'separate',
ADD COLUMN     "pricePerSession" DOUBLE PRECISION;
