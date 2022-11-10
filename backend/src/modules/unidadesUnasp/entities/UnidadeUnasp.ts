import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Vinculo } from '@modules/vinculos/entities/Vinculo';

@Entity('unidades_unasp')
export class UnidadeUnasp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ name: 'contato_assesoria' })
  contatoAssesoria?: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;

  @OneToMany(() => Vinculo, (areaAtuacao) => areaAtuacao.unidadeUnasp)
  vinculos: Vinculo[];
}
