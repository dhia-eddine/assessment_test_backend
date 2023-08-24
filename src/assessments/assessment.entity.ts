import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { JobOffer } from '../job-offers/job-offer.entity';
import { AssessmentQuestionDto } from './dto/assessment-question.dto';
import { AssessmentQuestion } from './assessment-question.entity';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => JobOffer)
  @JoinColumn()
  jobOffer: JobOffer;

  @OneToMany(() => AssessmentQuestion, question => question.assessment, { cascade: true })
  questions: AssessmentQuestion[];

  @Column({ type: 'integer', array: true })
  correctAnswers: number[];


  @Column('integer')
  passingScore: number;

  @Column('integer')
  timeLimitMinutes: number;
}
