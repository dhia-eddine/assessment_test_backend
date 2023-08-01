import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { JobOffer } from './job-offer.entity';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('job-offers')
@UseGuards(AuthGuard) // Apply the AuthGuard to protect all routes in this controller
export class JobOffersController {
  constructor(private readonly jobOffersService: JobOffersService) {}

  @Get()
  async getAllJobOffers(): Promise<JobOffer[]> {
    return this.jobOffersService.getAllJobOffers();
  }

  @Get(':id')
  async getJobOfferById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<JobOffer> {
    return this.jobOffersService.getJobOfferById(id);
  }

  @Post()
  async createJobOffer(
    @Body(ValidationPipe) createJobOfferDto: CreateJobOfferDto,
  ): Promise<JobOffer> {
    return this.jobOffersService.createJobOffer(createJobOfferDto);
  }

  @Put(':id')
  async updateJobOffer(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateJobOfferDto: UpdateJobOfferDto,
  ): Promise<JobOffer> {
    return this.jobOffersService.updateJobOffer(id, updateJobOfferDto);
  }

  @Delete(':id')
  async deleteJobOffer(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.jobOffersService.deleteJobOffer(id);
  }

  @Put(':id/close')
  async closeJobOffer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<JobOffer> {
    return this.jobOffersService.closeJobOffer(id);
  }
}
