import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from './assessment.entity';
import { AssessmentQuestionDto } from './dto/assessment-question.dto';
import { JobOffer } from '../job-offers/job-offer.entity';
import { AssessmentQuestion } from './assessment-question.entity'; // Import your AssessmentQuestion entity

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
    @InjectRepository(AssessmentQuestion)
    private questionRepository: Repository<AssessmentQuestion>,
  ) {}

  async createAssessment(
    jobOffer: JobOffer,
    questions: AssessmentQuestionDto[],
    passingScore: number,
    timeLimitMinutes: number,
  ): Promise<Assessment> {
    const assessment = this.assessmentRepository.create({
      jobOffer,
      correctAnswers: questions.map((q) => q.correctAnswerIndex),
      passingScore,
      timeLimitMinutes,
    });

    assessment.questions = []; // Initialize the questions array

    for (const questionDto of questions) {
      const question = this.questionRepository.create({
        question: questionDto.question,
        answers: questionDto.answers,
        correctAnswerIndex: questionDto.correctAnswerIndex,
      });
      assessment.questions.push(question);
    }

    return this.assessmentRepository.save(assessment);
  }
}

