import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentalFacility } from '../entities/environmental-facility.entity';
import { EnvironmentalSubsystem } from '../enums/environmental-subsystem';
import {
    EnvironmentalFacilityIndicator
} from '../entities/environmental-facility-indicator.entity';

@Injectable()
export class EnvironmentalFacilitiesService {
    constructor(
        @InjectRepository(EnvironmentalFacility)
        private readonly facilityRepository: Repository<EnvironmentalFacility>,

        @InjectRepository(EnvironmentalFacilityIndicator)
        private readonly facilityIndicatorsRepository: Repository<EnvironmentalFacilityIndicator>,
    ) { }

    public async findAll(subsystemTypes?: EnvironmentalSubsystem[]): Promise<EnvironmentalFacility[]> {
        const query = this.facilityRepository.createQueryBuilder('facility')
            .leftJoinAndSelect('facility.facilityIndicators', 'facilityIndicators')
            .leftJoinAndMapOne(
                'facilityIndicators.environmentalIndicator',
                'facilityIndicators.environmentalIndicator',
                'environmentalIndicator'
            );

        if (subsystemTypes && subsystemTypes.length > 0) {
            query.where('facility.subsystemType IN (:...subsystemTypes)', { subsystemTypes });
        }

        return query.getMany();
    }

    public async findOne(id: number): Promise<EnvironmentalFacility | null> {
        return this.facilityRepository.findOne({
            where: { id },
            relations: { facilityIndicators: { environmentalIndicator: true }},
        });
    }

    public async create(facility: Partial<EnvironmentalFacility>): Promise<EnvironmentalFacility> {
        return this.facilityRepository.save(this.facilityRepository.create(facility));
    }

    public async update(id: number, facility: Partial<EnvironmentalFacility>): Promise<EnvironmentalFacility | null> {
        await this.facilityRepository.update(id, {
            name: facility.name,
            subsystemType: facility.subsystemType,
        });

        if (facility.facilityIndicators) {
            const existingIndicators = await this.facilityIndicatorsRepository.find({
                where: { environmentalFacility: { id } },
            });

            const existingIds = existingIndicators.map(indicator => indicator.id);
            const newIds = facility.facilityIndicators.map(indicator => indicator.id).filter(id => id);

            for (const indicator of facility.facilityIndicators) {
                if (indicator.id && existingIds.includes(indicator.id)) {
                    await this.facilityIndicatorsRepository.update(indicator.id, indicator);
                }
            }

            const indicatorsToDelete = existingIds.filter(id => !newIds.includes(id));
            if (indicatorsToDelete.length > 0) {
                await this.facilityIndicatorsRepository.delete(indicatorsToDelete);
            }

            const newIndicators = facility.facilityIndicators.filter(indicator => !indicator.id);
            if (newIndicators.length > 0) {
                await this.facilityIndicatorsRepository.save(
                  newIndicators.map(indicator => ({
                      ...indicator,
                      facility: { id },
                  }))
                );
            }
        }

        return this.findOne(id);
    }

    public async delete(id: number): Promise<void> {
        await this.facilityRepository.delete(id);
    }
}
