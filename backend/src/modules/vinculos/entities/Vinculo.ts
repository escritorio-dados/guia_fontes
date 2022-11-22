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
import { Periodo } from '@modules/periodos/entities/Periodo';
import { UnidadeUnasp } from '@modules/unidadesUnasp/entities/UnidadeUnasp';

@Entity('vinculos_unasp_docente')
export class Vinculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  unidade_id: string;

  @Column('uuid')
  docente_id: string;

  @Column('uuid')
  periodo_id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @ManyToOne(() => UnidadeUnasp)
  @JoinColumn({ name: 'unidade_id' })
  unidadeUnasp?: UnidadeUnasp;

  @ManyToOne(() => Docente)
  @JoinColumn({ name: 'docente_id' })
  docente?: Docente;

  @ManyToOne(() => Periodo)
  @JoinColumn({ name: 'periodo_id' })
  periodo?: Periodo;
}
