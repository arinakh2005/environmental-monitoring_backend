import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EnvironmentalIndicatorsService } from './environmental-indicators.service';
import { EnvironmentalIndicator } from './entities/environmental-indicator.entity';

@Controller('environmental-indicators')
export class EnvironmentalIndicatorsController {
    constructor(private readonly indicatorsService: EnvironmentalIndicatorsService) { }

    @Get()
    public getAll(): Promise<EnvironmentalIndicator[]> {
        return this.indicatorsService.getAll();
    }

    @Get(':id')
    public getById(@Param('id') id: number): Promise<EnvironmentalIndicator | null> {
        return this.indicatorsService.getById(id);
    }

    @Post()
    public create(@Body() data: Partial<EnvironmentalIndicator>): Promise<EnvironmentalIndicator> {
        return this.indicatorsService.create(data);
    }

    @Put(':id')
    public update(@Param('id') id: number, @Body() data: Partial<EnvironmentalIndicator>): Promise<EnvironmentalIndicator | null> {
        return this.indicatorsService.update(id, data);
    }

    @Delete(':id')
    public delete(@Param('id') id: number): Promise<void> {
        return this.indicatorsService.delete(id);
    }
}
