import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentalFacilitiesController } from './controllers/environmental-facilities.controller';
import { EnvironmentalFacilitiesService } from './services/environmental-facilities.service';
import { EnvironmentalFacility } from './entities/environmental-facility.entity';
import { EnvironmentalFacilityIndicator } from './entities/environmental-facility-indicator.entity';
import { EnvironmentalFacilityIndicatorController } from './controllers/environmental-facility-indicators.controller';
import { EnvironmentalFacilityIndicatorsService } from './services/environmental-facility-indicators.service';
import { EnvironmentalIndicator } from './entities/environmental-indicator.entity';
import { EnvironmentalIndicatorsController } from './controllers/environmental-indicators.controller';
import { EnvironmentalIndicatorsService } from './services/environmental-indicators.service';
import { EnvironmentalProtectionMeasure } from './entities/environmental-protection-measure.entity';
import { EnvironmentalProtectionMeasureController } from './controllers/environmental-protection-measure.controller';
import { EnvironmentalProtectionMeasureService } from './services/environmental-protection-measure.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'environmental_monitoring',
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([
            EnvironmentalFacility,
            EnvironmentalIndicator,
            EnvironmentalFacilityIndicator,
            EnvironmentalProtectionMeasure,
        ]),
    ],
    controllers: [
        AppController,
        EnvironmentalFacilitiesController,
        EnvironmentalIndicatorsController,
        EnvironmentalFacilityIndicatorController,
        EnvironmentalProtectionMeasureController,
    ],
    providers: [
        AppService,
        EnvironmentalFacilitiesService,
        EnvironmentalIndicatorsService,
        EnvironmentalFacilityIndicatorsService,
        EnvironmentalProtectionMeasureService,
    ],
})
export class AppModule { }
