import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnvironmentalFacilityIndicator } from '../entities/environmental-facility-indicator.entity';
import { EnvironmentalSubsystem } from '../enums/environmental-subsystem';

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
        if (dto.environmentalIndicator.subsystemType === EnvironmentalSubsystem.AirQuality && ['Пил 10 мкм', 'Пил 2.5 мкм', 'Аміак'].includes(dto.environmentalIndicator.name)) {
            dto.calculatedData = { aqi: this.getAQIParamLevel(dto.environmentalIndicator.name, +dto.value)};
        } else if (dto.environmentalIndicator.subsystemType ===  EnvironmentalSubsystem.CoastalWater && ['Арсен', 'Кобальт', 'Хром загальний', 'Алахлор', 'Антрацен', 'Бензол'].includes(dto.environmentalIndicator.name)) {
            dto.calculatedData = { concentrationRatio: +dto.value / +dto.environmentalIndicator.norm };
        }

        const facilityIndicator = this.facilityIndicatorRepository.create(dto);

        return this.facilityIndicatorRepository.save(facilityIndicator);
    }

    public async update(id: number, dto: EnvironmentalFacilityIndicator): Promise<EnvironmentalFacilityIndicator | null> {
        const existingIndicator = await this.facilityIndicatorRepository.findOne({ where: { id }, relations: ['environmentalIndicator'] });
        if (!existingIndicator) return null;

        if (existingIndicator.environmentalIndicator.subsystemType ===  EnvironmentalSubsystem.AirQuality && ['Пил 10 мкм', 'Пил 2.5 мкм', 'Аміак'].includes(existingIndicator.environmentalIndicator.name)) {
            dto.calculatedData = { aqi: this.getAQIParamLevel(existingIndicator.environmentalIndicator.name, +dto.value) };
        } else if (existingIndicator.environmentalIndicator.subsystemType ===  EnvironmentalSubsystem.CoastalWater && ['Арсен', 'Свинець та його сполуки', 'Кадмій та його сполуки', 'Нітрит-іони'].includes(existingIndicator.environmentalIndicator.name)) {
            dto.calculatedData = { concentrationRatio: +dto.value / +existingIndicator.environmentalIndicator.norm };
        }

        if (existingIndicator.environmentalIndicator.norm) {
            existingIndicator.meets_standard = +existingIndicator.value <= +existingIndicator.environmentalIndicator.norm;
        }

        await this.facilityIndicatorRepository.update(id, dto);

        return this.findOne(id);
    }

    public async remove(id: number): Promise<void> {
        await this.facilityIndicatorRepository.delete(id);
    }

    private getAQIParamLevel(type: string, value: number): number {
        const aqiLevels = {
            'Пил 10 мкм': [
                { range: [0, 50], aqi: [0, 50] },
                { range: [51, 100], aqi: [51, 100] },
                { range: [101, 250], aqi: [101, 200] },
                { range: [251, 350], aqi: [201, 300] },
                { range: [351, 430], aqi: [301, 400] },
                { range: [431, 99999], aqi: [401, 500] },
            ],
            'Пил 2.5 мкм': [
                { range: [0, 30], aqi: [0, 50] },
                { range: [31, 60], aqi: [51, 100] },
                { range: [61, 90], aqi: [101, 200] },
                { range: [91, 120], aqi: [201, 300] },
                { range: [121, 250], aqi: [301, 400] },
                { range: [251, 99999], aqi: [401, 500] },
            ],
            'Аміак': [
                { range: [0, 200], aqi: [0, 50] },
                { range: [201, 400], aqi: [51, 100] },
                { range: [401, 800], aqi: [101, 200] },
                { range: [801, 1200], aqi: [201, 300] },
                { range: [1201, 1800], aqi: [301, 400] },
                { range: [1801, 99999], aqi: [401, 500] },
            ],
        };

        if (!aqiLevels[type]) return 0;

        for (const { range, aqi } of aqiLevels[type]) {
            if (value >= range[0] && value <= range[1]) {
                return this.interpolateAQIParam(value, range[0], range[1], aqi[0], aqi[1]);
            }
        }

        return 500;
    }

    private interpolateAQIParam(value: number, low: number, high: number, aqiLow: number, aqiHigh: number): number {
        return ((aqiHigh - aqiLow) / (high - low)) * (value - low) + aqiLow;
    }
}
