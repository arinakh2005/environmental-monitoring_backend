import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {
    EnvironmentalFacilityIndicator
} from './environmental-facility-indicator.entity';

@Entity()
export class EnvironmentalFacility {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column({ nullable: true })
    public identifier: string;

    @Column()
    public address: string;

    @Column()
    public coordinates: string;

    @Column({ name: 'subsystem_type' })
    public subsystemType: string;

    @Column({ name: 'subsystem_description' })
    public subsystemDescription: string;

    @Column({ name: 'indicators_title' })
    public indicatorsTitle: string;

    @Column({ name: 'calculated_data', type: 'json', nullable: true })
    public calculatedData: Record<string, any>;

    @OneToMany(() => EnvironmentalFacilityIndicator, (facilityIndicator) => facilityIndicator.environmentalFacility)
    public facilityIndicators: EnvironmentalFacilityIndicator[];
}
