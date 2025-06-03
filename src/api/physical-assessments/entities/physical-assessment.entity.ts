import { PhysicalAssessment } from '@prisma/client';

export class PhysicalAssessmentEntity implements PhysicalAssessment {
  id: number;
  userId: string;
  date: Date;
  weight: number | null;
  height: number | null;
  bodyFatPercentage: number | null;
  muscleMassPercentage: number | null;
  tricepsSkinfold: number | null;
  bicepsSkinfold: number | null;
  subscapularSkinfold: number | null;
  suprailiacSkinfold: number | null;
  midaxillarySkinfold: number | null;
  pectoralSkinfold: number | null;
  thighSkinfold: number | null;
  observations: string | null;
}
