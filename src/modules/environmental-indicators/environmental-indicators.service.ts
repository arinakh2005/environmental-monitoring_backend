import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentalIndicator } from './entities/environmental-indicator.entity';

@Injectable()
export class EnvironmentalIndicatorsService {
    constructor(
        @InjectRepository(EnvironmentalIndicator)
        private readonly indicatorRepository: Repository<EnvironmentalIndicator>,
    ) { }

    public async getAll(): Promise<EnvironmentalIndicator[]> {
        return this.indicatorRepository.find({ relations: ['environmentalFacility'] });
    }

    public async getById(id: number): Promise<EnvironmentalIndicator | null> {
        return this.indicatorRepository.findOne({ where: { id }, relations: ['environmentalFacility'] });
    }

    public async create(data: Partial<EnvironmentalIndicator>): Promise<EnvironmentalIndicator> {
        const newIndicator = this.indicatorRepository.create(data);

        return this.indicatorRepository.save(newIndicator);
    }

    public async update(id: number, data: Partial<EnvironmentalIndicator>): Promise<EnvironmentalIndicator | null> {
        await this.indicatorRepository.update(id, data);

        return this.getById(id);
    }

    public async delete(id: number): Promise<void> {
        await this.indicatorRepository.delete(id);
    }
}
