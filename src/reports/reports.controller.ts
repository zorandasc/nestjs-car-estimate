import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ApproveReportDto } from './dto/approve-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { OutputReportDto } from './dto/output-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  //@UseGuards(AuthGuard) zastitii routu logovamim korisnikom
  @UseGuards(AuthGuard)
  //@Serialize is our custom intrceptor/decorator,
  //ima ulogu da promijeni entity objekat iz baze u nas respomse
  @Serialize(OutputReportDto)
  create(@Body() createReportDto: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(createReportDto, user);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  approveReport(
    @Param('id') id: string,
    @Body() approveReportDto: ApproveReportDto,
  ) {
    return this.reportsService.changeApproval(+id, approveReportDto.approved);
  }

  @Get('all')
  getAllReports() {
    return this.reportsService.findAll();
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    console.log(query);
    return this.reportsService.createEstimate(query);
  }
}
