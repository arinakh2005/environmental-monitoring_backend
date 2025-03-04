import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentalFacilityIndicator } from '../entities/environmental-facility-indicator.entity';

@Injectable()
export class EnvironmentalFacilityIndicatorsService {
    constructor(
      @InjectRepository(EnvironmentalFacilityIndicator)
      private readonly facilityIndicatorRepository: Repository<EnvironmentalFacilityIndicator>,
    ) { }

    public async findAll(): Promise<EnvironmentalFacilityIndicator[]> {
        return this.facilityIndicatorRepository.find({ relations: ['environmentalFacility', 'environmentalIndicator'] });
    }

    public async findOne(id: number): Promise<EnvironmentalFacilityIndicator | null> {
        return this.facilityIndicatorRepository.findOne({
            where: { id },
            relations: ['environmentalFacility', 'environmentalIndicator'],
        });
    }

    public async findLastIndicators(facilityId: number, indicatorId: number, count: number = 7): Promise<EnvironmentalFacilityIndicator[]> {
        return this.facilityIndicatorRepository
          .createQueryBuilder('environmentalFacilityIndicator')
          .where('environmentalFacilityIndicator.environmental_facility_id = :facilityId', { facilityId })
          .andWhere('environmentalFacilityIndicator.environmental_indicator_id = :indicatorId', { indicatorId })
          .orderBy('environmentalFacilityIndicator.date', 'ASC')
          .limit(count)
          .getMany();
    }

    public async create(dto: EnvironmentalFacilityIndicator): Promise<EnvironmentalFacilityIndicator> {
        const facilityIndicator = this.facilityIndicatorRepository.create(dto);

        return this.facilityIndicatorRepository.save(facilityIndicator);
    }

    public async update(id: number, dto: EnvironmentalFacilityIndicator): Promise<EnvironmentalFacilityIndicator | null> {
        await this.facilityIndicatorRepository.update(id, dto);

        return this.findOne(id);
    }

    public async remove(id: number): Promise<void> {
        await this.facilityIndicatorRepository.delete(id);
    }
}
