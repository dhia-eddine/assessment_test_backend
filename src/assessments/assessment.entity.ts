// assessment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { JobOffer } from '../job-offers/job-offer.entity';
import { AssessmentQuestionDto } from './dto/assessment-question.dto';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobOffer)
  jobOffer: JobOffer;

  @Column({ type: 'jsonb' })
  questions: AssessmentQuestionDto[];

  @Column({ type: 'integer', array: true })
  correctAnswerIndices: number[];

  @Column('integer')
  passingScore: number;

  @Column('integer')
  timeLimitMinutes: number;
}
