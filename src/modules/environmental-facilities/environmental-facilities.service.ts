import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentalFacility } from './entities/environmental-facility.entity';

@Injectable()
export class EnvironmentalFacilitiesService {
    constructor(
        @InjectRepository(EnvironmentalFacility)
        private readonly facilityRepository: Repository<EnvironmentalFacility>,
    ) { }

    public async getAllEnvironmentalFacilities(): Promise<EnvironmentalFacility[]> {
        return await this.facilityRepository.find({ relations: ['indicators'] });
    }
}
