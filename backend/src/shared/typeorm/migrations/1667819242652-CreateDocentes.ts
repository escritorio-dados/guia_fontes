import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDocentes1667819242652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'docentes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contato_assesoria',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lattes_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'resumo_lattes',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'imprensa',
            type: 'boolean',
            default: false,
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('docentes');
  }
}
