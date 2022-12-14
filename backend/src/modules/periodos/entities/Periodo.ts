import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Vinculo } from '@modules/vinculos/entities/Vinculo';

@Entity('periodos')
export class Periodo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column('boolean')
  atual: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @OneToMany(() => Vinculo, (areaAtuacao) => areaAtuacao.periodo)
  vinculos: Vinculo[];
}
