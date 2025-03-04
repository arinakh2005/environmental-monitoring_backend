import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { EnvironmentalFacilityIndicatorsService } from '../services/environmental-facility-indicators.service';
import { EnvironmentalFacilityIndicator } from '../entities/environmental-facility-indicator.entity';

@Controller('environmental-facility-indicators')
export class EnvironmentalFacilityIndicatorController {
    constructor(private readonly facilityIndicatorService: EnvironmentalFacilityIndicatorsService) { }

    @Get()
    public async findAll(): Promise<EnvironmentalFacilityIndicator[]> {
        return this.facilityIndicatorService.findAll();
    }

    @Get(':id')
    public async findOne(@Param('id') id: number): Promise<EnvironmentalFacilityIndicator | null> {
        return this.facilityIndicatorService.findOne(id);
    }

    @Get('facility/:facilityId/indicator/:indicatorId/last')
    public async findLastIndicators(
      @Param('facilityId') facilityId: number,
      @Param('indicatorId') indicatorId: number,
      @Query('count') count?: number,
    ): Promise<EnvironmentalFacilityIndicator[]> {
        return this.facilityIndicatorService.findLastIndicators(facilityId, indicatorId, count ?? 7);
    }

    @Post()
    public async create(@Body() dto: EnvironmentalFacilityIndicator): Promise<EnvironmentalFacilityIndicator> {
        return this.facilityIndicatorService.create(dto);
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() dto: EnvironmentalFacilityIndicator): Promise<EnvironmentalFacilityIndicator | null> {
        return this.facilityIndicatorService.update(id, dto);
    }

    @Delete(':id')
    public async remove(@Param('id') id: number): Promise<void> {
        return this.facilityIndicatorService.remove(id);
    }
}
