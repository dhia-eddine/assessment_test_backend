// assessments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from './assessment.entity';
import { AssessmentQuestionDto } from './dto/assessment-question.dto';
import { JobOffer } from '../job-offers/job-offer.entity';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
  ) {}

  async createAssessment(
    jobOffer: JobOffer,
    questions: AssessmentQuestionDto[],
    passingScore: number,
    timeLimitMinutes: number,
  ): Promise<Assessment> {
    const assessment = new Assessment();
    assessment.jobOffer = jobOffer;
    assessment.questions = questions;
    assessment.correctAnswerIndices = questions.map(q => q.correctAnswerIndex);
    assessment.passingScore = passingScore;
    assessment.timeLimitMinutes = timeLimitMinutes;

    return this.assessmentRepository.save(assessment);
  }
}
