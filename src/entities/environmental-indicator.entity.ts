import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EnvironmentalSubsystem } from '../enums/environmental-subsystem';
import { EnvironmentalFacilityIndicator } from './environmental-facility-indicator.entity';

@Entity()
export class EnvironmentalIndicator {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({ name: 'measurement_unit', nullable: true })
    public measurementUnit: string;

    @Column({ name: 'subsystem_type', type: 'enum', enum: EnvironmentalSubsystem, nullable: true })
    public subsystemType: EnvironmentalSubsystem;

    @OneToMany(() => EnvironmentalFacilityIndicator, (facilityIndicator) => facilityIndicator.environmentalFacility)
    public facilityIndicators: EnvironmentalFacilityIndicator[];
}
