import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentalProtectionMeasure } from '../entities/environmental-protection-measure.entity';
import { EnvironmentalSubsystem } from '../enums/environmental-subsystem';

@Injectable()
export class EnvironmentalProtectionMeasureService {
    constructor(
        @InjectRepository(EnvironmentalProtectionMeasure)
        private readonly protectionMeasureRepository: Repository<EnvironmentalProtectionMeasure>,
    ) { }

    public async findAll(): Promise<EnvironmentalProtectionMeasure[]> {
        return this.protectionMeasureRepository.find();
    }

    public async findOne(id: number): Promise<EnvironmentalProtectionMeasure | null> {
        return this.protectionMeasureRepository.findOneBy({ id });
    }

    public async findBySubsystemType(subsystemType: EnvironmentalSubsystem): Promise<EnvironmentalProtectionMeasure[]> {
        return this.protectionMeasureRepository.find({
            where: { subsystemType },
        });
    }

    public async create(data: Partial<EnvironmentalProtectionMeasure>): Promise<EnvironmentalProtectionMeasure> {
        const newMeasure = this.protectionMeasureRepository.create(data);

        return this.protectionMeasureRepository.save(newMeasure);
    }

    public async update(id: number, data: Partial<EnvironmentalProtectionMeasure>): Promise<EnvironmentalProtectionMeasure | null> {
        await this.protectionMeasureRepository.update(id, data);

        return this.findOne(id);
    }

    public async remove(id: number): Promise<void> {
        await this.protectionMeasureRepository.delete(id);
    }
}
