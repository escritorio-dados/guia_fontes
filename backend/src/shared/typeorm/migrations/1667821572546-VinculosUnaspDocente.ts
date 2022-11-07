import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class VinculosUnaspDocente1667821572546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vinculos_unasp_docente',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'unidade_id',
            type: 'uuid',
          },
          {
            name: 'docente_id',
            type: 'uuid',
          },
          {
            name: 'periodo_id',
            type: 'uuid',
          },
          {
            name: 'dominante',
            type: 'boolean',
            default: 'false',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'vinculos_unasp_docente_to_periodos',
            columnNames: ['periodo_id'],
            referencedTableName: 'periodos',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
          {
            name: 'vinculos_unasp_docente_to_unidades_unasp',
            columnNames: ['unidade_id'],
            referencedTableName: 'unidades_unasp',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          },
          {
            name: 'vinculos_unasp_docente_to_docentes',
            columnNames: ['docente_id'],
            referencedTableName: 'docentes',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vinculos_unasp_docente');
  }
}
