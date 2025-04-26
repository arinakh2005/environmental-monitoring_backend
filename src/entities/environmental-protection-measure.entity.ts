import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EnvironmentalSubsystem } from '../enums/environmental-subsystem';

@Entity()
export class EnvironmentalProtectionMeasure {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'subsystem_type', type: 'enum', enum: EnvironmentalSubsystem, nullable: true })
  public subsystemType: EnvironmentalSubsystem;

  @Column({ name: 'object_name' })
  public objectName: string;

  @Column({ name: 'protection_measure_name' })
  public protectionMeasureName: string;

  @Column('float', { name: 'estimated_funding' })
  public estimatedFunding: number;

  @Column({ name: 'execution_period' })
  public executionPeriod: string;

  @Column({ name: 'expected_effect' })
  public expectedEffect: string;

  @Column({ name: 'funding_source' })
  public fundingSource: string;

  @Column()
  public executor: string;
}
