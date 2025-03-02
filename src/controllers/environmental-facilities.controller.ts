import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EnvironmentalFacilitiesService } from '../services/environmental-facilities.service';
import { EnvironmentalFacility } from '../entities/environmental-facility.entity';
import { EnvironmentalSubsystem } from '../enums/environmental-subsystem';

@Controller('environmental-facilities')
export class EnvironmentalFacilitiesController {
    constructor(private readonly facilitiesService: EnvironmentalFacilitiesService) { }

    @Get()
    public async getAll(@Query('subsystemTypes') subsystemTypes?: string): Promise<EnvironmentalFacility[]> {
        let parsedSubsystemTypes: EnvironmentalSubsystem[] = [];

        if (subsystemTypes) {
            parsedSubsystemTypes = subsystemTypes.split(',') as EnvironmentalSubsystem[];
        }

        return this.facilitiesService.findAll(parsedSubsystemTypes);
    }

    @Get(':id')
    public async getOne(@Param('id') id: number): Promise<EnvironmentalFacility | null> {
        return this.facilitiesService.findOne(id);
    }

    @Post()
    public async create(@Body() facility: Partial<EnvironmentalFacility>): Promise<EnvironmentalFacility> {
        return this.facilitiesService.create(facility);
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() facility: Partial<EnvironmentalFacility>): Promise<EnvironmentalFacility | null> {
        return this.facilitiesService.update(id, facility);
    }

    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<void> {
        return this.facilitiesService.delete(id);
    }
}
