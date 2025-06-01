-- CreateTable
CREATE TABLE "Exercises" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tips" TEXT NOT NULL,
    "mistakes" TEXT NOT NULL,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Methods" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workouts" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "workoutsGroupsId" INTEGER NOT NULL,
    "methodId" INTEGER,

    CONSTRAINT "Workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutsGroups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "personalId" INTEGER,

    CONSTRAINT "WorkoutsGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL DEFAULT 'https://w7.pngwing.com/pngs/620/837/png-transparent-bodybuilding-drawing-bodybuilding-physical-fitness-logo-monochrome-thumbnail.png',
    "telegramId" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSeries" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL DEFAULT 15,
    "weight" INTEGER DEFAULT 10,
    "rest" INTEGER DEFAULT 60,

    CONSTRAINT "WorkoutSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutSessions" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutGroupId" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "WorkoutSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personals" (
    "id" SERIAL NOT NULL,
    "studentUserId" TEXT NOT NULL,
    "personalUserId" TEXT NOT NULL,

    CONSTRAINT "Personals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalClassSchedule" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "personalsId" INTEGER NOT NULL,

    CONSTRAINT "PersonalClassSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PhysicalAssessment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "bodyFatPercentage" DOUBLE PRECISION,
    "muscleMassPercentage" DOUBLE PRECISION,
    "observations" TEXT,

    CONSTRAINT "PhysicalAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notifications" (
    "id" SERIAL NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "readStatus" BOOLEAN NOT NULL DEFAULT false,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutSessionId" INTEGER,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassBooking" (
    "id" SERIAL NOT NULL,
    "personalClassScheduleId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "bookingDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'booked',

    CONSTRAINT "ClassBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercises_name_key" ON "Exercises"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Workouts_workoutsGroupsId_exerciseId_key" ON "Workouts"("workoutsGroupsId", "exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutsGroups_userId_name_key" ON "WorkoutsGroups"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Personals_studentUserId_personalUserId_key" ON "Personals"("studentUserId", "personalUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Notifications_workoutSessionId_key" ON "Notifications"("workoutSessionId");

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "Methods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_workoutsGroupsId_fkey" FOREIGN KEY ("workoutsGroupsId") REFERENCES "WorkoutsGroups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutsGroups" ADD CONSTRAINT "WorkoutsGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutsGroups" ADD CONSTRAINT "WorkoutsGroups_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSeries" ADD CONSTRAINT "WorkoutSeries_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSessions" ADD CONSTRAINT "WorkoutSessions_workoutGroupId_fkey" FOREIGN KEY ("workoutGroupId") REFERENCES "WorkoutsGroups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personals" ADD CONSTRAINT "Personals_studentUserId_fkey" FOREIGN KEY ("studentUserId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personals" ADD CONSTRAINT "Personals_personalUserId_fkey" FOREIGN KEY ("personalUserId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalClassSchedule" ADD CONSTRAINT "PersonalClassSchedule_personalsId_fkey" FOREIGN KEY ("personalsId") REFERENCES "Personals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhysicalAssessment" ADD CONSTRAINT "PhysicalAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "WorkoutSessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassBooking" ADD CONSTRAINT "ClassBooking_personalClassScheduleId_fkey" FOREIGN KEY ("personalClassScheduleId") REFERENCES "PersonalClassSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassBooking" ADD CONSTRAINT "ClassBooking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
