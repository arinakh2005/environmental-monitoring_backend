import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentalFacilitiesModule } from './modules/environmental-facilities/environmental-facilities.module';
import { EnvironmentalIndicatorsModule } from './modules/environmental-indicators/environmental-indicators.module';

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
        EnvironmentalFacilitiesModule,
        EnvironmentalIndicatorsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
