import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddEmailAssesoria1669637843834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'docentes',
      new TableColumn({
        name: 'email_assesoria',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('docentes', 'email_assesoria');
  }
}
