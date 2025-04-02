import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EnvironmentalIndicator } from './environmental-indicator.entity';
import { EnvironmentalFacility } from './environmental-facility.entity';

@Entity()
export class EnvironmentalFacilityIndicator {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public value: string;

    @Column()
    public date: Date;

    @Column({ nullable: true })
    public norm: string;

    @Column({ nullable: true })
    public meets_standard: boolean;

    @Column({ name: 'calculated_data', type: 'json', nullable: true })
    public calculatedData: Record<string, any>;

    @ManyToOne(() => EnvironmentalFacility, (environmentalFacility) => environmentalFacility.facilityIndicators, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'environmental_facility_id' })
    public environmentalFacility: EnvironmentalFacility;

    @ManyToOne(() => EnvironmentalIndicator, (environmentalIndicator) => environmentalIndicator.facilityIndicators, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'environmental_indicator_id' })
    public environmentalIndicator: EnvironmentalIndicator;
}
