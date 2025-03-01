import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentalIndicator } from './entities/environmental-indicator.entity';
import { EnvironmentalIndicatorsController } from './environmental-indicators.controller';
import { EnvironmentalIndicatorsService } from './environmental-indicators.service';

@Module({
    imports: [TypeOrmModule.forFeature([EnvironmentalIndicator])],
    controllers: [EnvironmentalIndicatorsController],
    providers: [EnvironmentalIndicatorsService],
})
export class EnvironmentalIndicatorsModule { }
