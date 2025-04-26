import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { EnvironmentalProtectionMeasure } from '../entities/environmental-protection-measure.entity';
import { EnvironmentalProtectionMeasureService } from '../services/environmental-protection-measure.service';
import { EnvironmentalSubsystem } from '../enums/environmental-subsystem';

@Controller('environmental-protection-measures')
export class EnvironmentalProtectionMeasureController {
    constructor(private readonly protectionMeasureService: EnvironmentalProtectionMeasureService) {}

    @Get()
    public async findAll(): Promise<EnvironmentalProtectionMeasure[]> {
        return this.protectionMeasureService.findAll();
    }

    @Get('by-subsystem')
    public async findBySubsystemType(@Query('subsystemType') subsystemType: EnvironmentalSubsystem): Promise<EnvironmentalProtectionMeasure[]> {
        return this.protectionMeasureService.findBySubsystemType(subsystemType);
    }

    @Get(':id')
    public async findOne(@Param('id') id: number): Promise<EnvironmentalProtectionMeasure | null> {
        return this.protectionMeasureService.findOne(id);
    }

    @Post()
    public async create(@Body() data: Partial<EnvironmentalProtectionMeasure>): Promise<EnvironmentalProtectionMeasure> {
        return this.protectionMeasureService.create(data);
    }

    @Patch(':id')
    public async update(
        @Param('id') id: number, @Body() data: Partial<EnvironmentalProtectionMeasure>,
    ): Promise<EnvironmentalProtectionMeasure | null> {
        return this.protectionMeasureService.update(id, data);
    }

    @Delete(':id')
    public async remove(@Param('id') id: number): Promise<void> {
        return this.protectionMeasureService.remove(id);
    }
}
