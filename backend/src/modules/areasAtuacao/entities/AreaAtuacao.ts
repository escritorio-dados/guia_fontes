import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Docente } from '@modules/docentes/entities/Docente';

@Entity('areas_atuacao')
export class AreaAtuacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'area_conhecimento' })
  areaConhecimento: string;

  @Column({ name: 'grande_area' })
  grandeArea?: string;

  @Column({ name: 'sub_area' })
  subArea?: string;

  @Column()
  especialidade?: string;

  @Column('uuid')
  docente_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @ManyToOne(() => Docente)
  @JoinColumn({ name: 'docente_id' })
  docente?: Docente;
}
