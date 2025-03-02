import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { EnvironmentalSubsystem } from '../enums/environmental-subsystem';
import { EnvironmentalFacilityIndicator } from './environmental-facility-indicator.entity';

@Entity()
export class EnvironmentalIndicator {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({ name: 'subsystem_type', type: 'enum', enum: EnvironmentalSubsystem, nullable: true })
    public subsystemType: EnvironmentalSubsystem;

    @OneToMany(() => EnvironmentalFacilityIndicator, (facilityIndicator) => facilityIndicator.environmentalFacility)
    @JoinColumn({ name: 'environmental_facility_indicator_id' })
    public facilityIndicators: EnvironmentalFacilityIndicator[];
}
