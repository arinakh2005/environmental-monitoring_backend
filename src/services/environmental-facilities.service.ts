import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentalFacility } from '../entities/environmental-facility.entity';
import { EnvironmentalSubsystem } from '../enums/environmental-subsystem';
import { EnvironmentalFacilityIndicator } from '../entities/environmental-facility-indicator.entity';
import { EnvironmentalFacilityIndicatorsService } from './environmental-facility-indicators.service';

@Injectable()
export class EnvironmentalFacilitiesService {
    constructor(
        @InjectRepository(EnvironmentalFacility)
        private readonly facilityRepository: Repository<EnvironmentalFacility>,
        private readonly facilityIndicatorsService: EnvironmentalFacilityIndicatorsService,
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

        const facilities = await query.getMany();

        return facilities.map((facility) => {
            const uniqueIndicators = new Map<number, EnvironmentalFacilityIndicator>();

            facility.facilityIndicators.forEach((facilityIndicator) => {
                const existing = uniqueIndicators.get(facilityIndicator.environmentalIndicator.id);

                if (!existing || new Date(facilityIndicator.date) > new Date(existing.date)) {
                    uniqueIndicators.set(facilityIndicator.environmentalIndicator.id, facilityIndicator);
                }
            });

            return {
                ...facility,
                facilityIndicators: Array.from(uniqueIndicators.values()),
            };
        });
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
        if (facility.facilityIndicators) {
            const existingIndicators = await this.facilityIndicatorsService.findAll();
            const filteredByFacilityIndicators = existingIndicators.filter((indicator) => +indicator.environmentalFacility.id === +id);
            const existingIds = filteredByFacilityIndicators.map(indicator => indicator.id);

            for (const indicator of facility.facilityIndicators) {
                if (indicator.id && existingIds.includes(indicator.id)) {
                    await this.facilityIndicatorsService.update(indicator.id, indicator);
                }
            }

            const newIndicators = facility.facilityIndicators.filter(indicator => !indicator.id);
            if (newIndicators.length > 0) {
                for (const indicator of newIndicators) {
                    await this.facilityIndicatorsService.create({...indicator, environmentalFacility: { id } as EnvironmentalFacility});
                }
            }

            if (facility.subsystemType === EnvironmentalSubsystem.AirQuality && filteredByFacilityIndicators.length > 0) {
                const aqiValues = filteredByFacilityIndicators
                  .map((indicator) => indicator.calculatedData?.aqi)
                  .filter((aqi) => !!aqi);
                facility.calculatedData = { overallAqi: aqiValues.length > 0 ? Math.max(...aqiValues) : null };
            }
        }

        await this.facilityRepository.update(id, {
            name: facility.name,
            subsystemType: facility.subsystemType,
            calculatedData: facility.calculatedData,
        });

        return this.findOne(id);
    }

    public async delete(id: number): Promise<void> {
        await this.facilityRepository.delete(id);
    }
}
