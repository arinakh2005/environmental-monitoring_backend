import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentalFacility } from './entities/environmental-facility.entity';
import { EnvironmentalSubsystem } from '../../enums/environmental-subsystem';

@Injectable()
export class EnvironmentalFacilitiesService {
    constructor(
        @InjectRepository(EnvironmentalFacility)
        private readonly facilityRepository: Repository<EnvironmentalFacility>,
    ) { }

    public async findAll(subsystemTypes?: EnvironmentalSubsystem[]): Promise<EnvironmentalFacility[]> {
        const query = this.facilityRepository.createQueryBuilder('facility')
          .leftJoinAndSelect('facility.indicators', 'indicators');

        if (subsystemTypes && subsystemTypes.length > 0) {
            query.where('facility.subsystemType IN (:...subsystemTypes)', { subsystemTypes });
        }

        return query.getMany();
    }

    public async findOne(id: number): Promise<EnvironmentalFacility | null> {
        return this.facilityRepository.findOne({ where: { id }, relations: ['indicators'] });
    }

    public async create(facility: Partial<EnvironmentalFacility>): Promise<EnvironmentalFacility> {
        return this.facilityRepository.save(this.facilityRepository.create(facility));
    }

    public async update(id: number, facility: Partial<EnvironmentalFacility>): Promise<EnvironmentalFacility | null> {
        await this.facilityRepository.update(id, facility);

        return this.findOne(id);
    }

    public async delete(id: number): Promise<void> {
        await this.facilityRepository.delete(id);
    }
}
