import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentalFacilityIndicatorController } from './controllers/environmental-facility-indicators.controller';
import { EnvironmentalFacilitiesController } from './controllers/environmental-facilities.controller';
import { EnvironmentalIndicatorsController } from './controllers/environmental-indicators.controller';
import { EnvironmentalFacilitiesService } from './services/environmental-facilities.service';
import { EnvironmentalIndicatorsService } from './services/environmental-indicators.service';
import { EnvironmentalFacilityIndicatorsService } from './services/environmental-facility-indicators.service';
import { EnvironmentalFacility } from './entities/environmental-facility.entity';
import { EnvironmentalIndicator } from './entities/environmental-indicator.entity';
import { EnvironmentalFacilityIndicator } from './entities/environmental-facility-indicator.entity';

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
        ]),
    ],
    controllers: [
        AppController,
        EnvironmentalFacilitiesController,
        EnvironmentalIndicatorsController,
        EnvironmentalFacilityIndicatorController,
    ],
    providers: [
        AppService,
        EnvironmentalFacilitiesService,
        EnvironmentalIndicatorsService,
        EnvironmentalFacilityIndicatorsService,
    ],
})
export class AppModule { }
