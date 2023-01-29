import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { GetEstimateDto } from './dto/get-estimate.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(createReportDto: CreateReportDto, user: User) {
    const report = this.repo.create(createReportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }

  findAll() {
    return this.repo.find();
  }

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        //show avreage on column price, represent reault with alias price
        .select('AVG(price)', 'price')
        //the same make
        .where('make = :make', { make })
        //same model
        .andWhere('model = :model', { model })
        //longitude in range +-5
        .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
        //latitud in range +-5
        .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
        //year in range +- 3 year
        .andWhere('year - :yaear BETWEEN -3 AND 3', { year })
        .andWhere('approved IS TRUE')
        //izaberi closest tu our mileage
        .orderBy('ABS(mileage - :mileage)', 'DESC')
        .setParameters({ mileage })
        //prva tri reyultata
        .limit(3)
        .getRawOne()
    );
  }
}
