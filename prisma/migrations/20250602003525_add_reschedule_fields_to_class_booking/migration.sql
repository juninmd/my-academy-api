-- AlterTable
ALTER TABLE "ClassBooking" ADD COLUMN     "isRescheduled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalClassBookingId" INTEGER;

-- AlterTable
ALTER TABLE "PersonalTrainingPlan" ADD COLUMN     "reschedulesPerMonthLimit" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "ClassBooking" ADD CONSTRAINT "ClassBooking_originalClassBookingId_fkey" FOREIGN KEY ("originalClassBookingId") REFERENCES "ClassBooking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
