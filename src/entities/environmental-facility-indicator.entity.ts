import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

    @ManyToOne(() => EnvironmentalFacility, (environmentalFacility) => environmentalFacility.facilityIndicators, { onDelete: 'CASCADE' })
    public environmentalFacility: EnvironmentalFacility;

    @ManyToOne(() => EnvironmentalIndicator, (environmentalIndicator) => environmentalIndicator.facilityIndicators, { onDelete: 'CASCADE' })
    public environmentalIndicator: EnvironmentalIndicator;
}
