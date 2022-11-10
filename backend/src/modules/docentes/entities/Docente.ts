import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { AreaAtuacao } from '@modules/areasAtuacao/entities/AreaAtuacao';
import { Vinculo } from '@modules/vinculos/entities/Vinculo';

@Entity('docentes')
export class Docente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ name: 'lattes_id' })
  lattesId: string;

  @Column({ name: 'resumo_lattes' })
  resumoLattes?: string;

  @Column('boolean')
  imprensa: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @OneToMany(() => AreaAtuacao, (areaAtuacao) => areaAtuacao.docente)
  areasAtuacao?: AreaAtuacao[];

  @OneToMany(() => Vinculo, (areaAtuacao) => areaAtuacao.docente)
  vinculos?: Vinculo[];
}
