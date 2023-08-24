import { Controller, Post, Body, ValidationPipe, UseGuards, Param } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Assessment } from './assessment.entity';
import { JobOffersService } from '../job-offers/job-offers.service'; // Import the JobOffersService
import { JobOffer } from '../job-offers/job-offer.entity'; // Import the JobOffer entity

@Controller('assessments')
@UseGuards(AuthGuard)
export class AssessmentsController {
  constructor(
    private readonly assessmentsService: AssessmentsService,
    private readonly jobOffersService: JobOffersService, // Inject the JobOffersService
  ) {}

  @Post('/create/:jobOfferId') // Use the jobOfferId parameter
  async createAssessment(
    @Param('jobOfferId') jobOfferId: number, // Get jobOfferId from the URL
    @Body(ValidationPipe) createAssessmentDto: CreateAssessmentDto,
  ): Promise<Assessment> {
    const jobOffer: JobOffer = await this.jobOffersService.getJobOfferById(jobOfferId); // Fetch the job offer entity
    return this.assessmentsService.createAssessment(
      jobOffer,
      createAssessmentDto.questions,
      createAssessmentDto.passingScore,
      createAssessmentDto.timeLimitMinutes,
    );
    
  }

  // Other methods for managing assessments
}
