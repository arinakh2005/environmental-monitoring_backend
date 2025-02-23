import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { EnvironmentalIndicator } from './environmental-indicator.entity';

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

    @OneToMany(() => EnvironmentalIndicator, (indicator) => indicator.environmentalFacility)
    @JoinColumn({ name: 'environmental_facility_id' })
    public indicators: EnvironmentalIndicator[];
}
