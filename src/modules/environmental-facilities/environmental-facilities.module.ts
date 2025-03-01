import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentalFacility } from './entities/environmental-facility.entity';
import { EnvironmentalFacilitiesController } from './environmental-facilities.controller';
import { EnvironmentalFacilitiesService } from './environmental-facilities.service';

@Module({
    imports: [TypeOrmModule.forFeature([EnvironmentalFacility])],
    controllers: [EnvironmentalFacilitiesController],
    providers: [EnvironmentalFacilitiesService],
})
export class EnvironmentalFacilitiesModule { }
