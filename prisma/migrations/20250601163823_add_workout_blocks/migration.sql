-- AlterTable
ALTER TABLE "WorkoutSeries" ADD COLUMN     "workoutBlockId" INTEGER;

-- CreateTable
CREATE TABLE "WorkoutBlock" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "WorkoutBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutBlock" ADD CONSTRAINT "WorkoutBlock_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSeries" ADD CONSTRAINT "WorkoutSeries_workoutBlockId_fkey" FOREIGN KEY ("workoutBlockId") REFERENCES "WorkoutBlock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
