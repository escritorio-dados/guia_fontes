import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AreasAtuacao1667823766396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'areas_atuacao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'docente_id',
            type: 'uuid',
          },
          {
            name: 'area_conhecimento',
            type: 'varchar',
          },
          {
            name: 'grande_area',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sub_area',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'especialidade',
            type: 'varchar',
            isNullable: true,
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
            name: 'areas_atuacao_to_docentes',
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
    await queryRunner.dropTable('areas_atuacao');
  }
}
