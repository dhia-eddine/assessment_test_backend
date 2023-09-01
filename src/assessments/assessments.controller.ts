import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Param,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Assessment } from './assessment.entity';
import { JobOffersService } from '../job-offers/job-offers.service'; // Import the JobOffersService
import { JobOffer } from '../job-offers/job-offer.entity'; // Import the JobOffer entity
import { AssessmentQuestionDto } from './dto/assessment-question.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/user.entity';

@Controller('assessments')
@UseGuards(AuthGuard)
export class AssessmentsController {
  constructor(
    private readonly assessmentsService: AssessmentsService,
    private readonly jobOffersService: JobOffersService, // Inject the JobOffersService
  ) {}

  @Post('/create/:jobOfferId') // Use the jobOfferId parameter
  @Roles(UserRole.ADMIN)
  async createAssessment(
    @Param('jobOfferId') jobOfferId: number, // Get jobOfferId from the URL
    @Body(ValidationPipe) createAssessmentDto: CreateAssessmentDto,
  ): Promise<Assessment> {
    const jobOffer: JobOffer = await this.jobOffersService.getJobOfferById(
      jobOfferId,
    ); // Fetch the job offer entity
    return this.assessmentsService.createAssessment(
      jobOffer,
      createAssessmentDto.questions,
      createAssessmentDto.passingScore,
      createAssessmentDto.timeLimitMinutes,
    );
  }
  @Get('/:assessmentId')
  @Roles(UserRole.ADMIN)
  async getAssessment(
    @Param('assessmentId') assessmentId: number,
  ): Promise<Assessment> {
    return this.assessmentsService.getAssessmentById(assessmentId);
  }
  @Patch('/:assessmentId')
  @Roles(UserRole.ADMIN)
  async updateAssessment(
    @Param('assessmentId') assessmentId: number,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ): Promise<Assessment> {
    const { passingScore, timeLimitMinutes } = updateAssessmentDto;
    return this.assessmentsService.updateAssessment(
      assessmentId,
      passingScore,
      timeLimitMinutes,
    );
  }

  @Delete('/:assessmentId')
  @Roles(UserRole.ADMIN)
  async deleteAssessment(
    @Param('assessmentId') assessmentId: number,
  ): Promise<void> {
    await this.assessmentsService.deleteAssessment(assessmentId);
  }

  @Post('/add-question/:assessmentId')
  @Roles(UserRole.ADMIN)
  async addQuestionToAssessment(
    @Param('assessmentId') assessmentId: number,
    @Body(ValidationPipe) questionDto: AssessmentQuestionDto,
  ): Promise<Assessment> {
    return this.assessmentsService.addQuestionToAssessment(
      assessmentId,
      questionDto,
    );
  }
  @Get('/questions/:assessmentId')
  @Roles(UserRole.ADMIN)
  async getAssessmentQuestions(
    @Param('assessmentId') assessmentId: number,
  ): Promise<{
    assessmentId: number;
    passingScore: number;
    timeLimitMinutes: number;
    questions: AssessmentQuestionDto[];
  }> {
    return this.assessmentsService.getAssessmentQuestions(assessmentId);
  }
  @Delete('/questions/:assessmentId/:questionId')
  @Roles(UserRole.ADMIN)
  async deleteQuestionFromAssessment(
    @Param('assessmentId') assessmentId: number,
    @Param('questionId') questionId: number,
  ): Promise<void> {
    await this.assessmentsService.deleteQuestionFromAssessment(
      assessmentId,
      questionId,
    );
  }
}
