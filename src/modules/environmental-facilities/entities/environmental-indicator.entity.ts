import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EnvironmentalFacility } from './environmental-facility.entity';

@Entity()
export class EnvironmentalIndicator {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public value: string;

    @Column({ nullable: true })
    public norm: string;

    @Column({ nullable: true })
    public meets_standard: boolean;

    @ManyToOne(() => EnvironmentalFacility, (environmentalFacility) => environmentalFacility.indicators, { onDelete: 'CASCADE' })
    public environmentalFacility: EnvironmentalFacility;
}
