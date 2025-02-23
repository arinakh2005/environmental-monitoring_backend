import { Controller, Get } from '@nestjs/common';
import { EnvironmentalFacilitiesService } from './environmental-facilities.service';

@Controller('environmental-facilities')
export class EnvironmentalFacilitiesController {
    constructor(private readonly environmentalFacilitiesService: EnvironmentalFacilitiesService) { }

    @Get()
    public findAll() {
        return this.environmentalFacilitiesService.getAllEnvironmentalFacilities();
    }
}
