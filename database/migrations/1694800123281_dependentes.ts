import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'dependente'.
 *
 * Esta migração verifica se a tabela 'dependente' já existe no banco de dados.
 * Se não existir, a tabela é criada com as colunas especificadas.
 * Se já existir, nada é feito no método 'up'.
 *
 * @class
 * @extends BaseSchema
 */
export default class extends BaseSchema {
  /**
   * Nome do esquema no banco de dados.
   *
   * @protected
   * @type {string}
   */
  protected schemaName: string = 'associado'

  /**
   * Nome da tabela que esta migração cria.
   *
   * @protected
   * @type {string}
   */
  protected tableName: string = 'dependente'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'dependente' se ela não existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async up(): Promise<void> {
    const hasTable = await this.schema
      .withSchema(this.schemaName)
      .hasTable(this.tableName)

    if (!hasTable) {
      this.schema.withSchema(this.schemaName)
        .createTable(this.tableName, (table) => {
          table.increments('id').primary()
          table.integer('associado_id').notNullable().unsigned().references('id').inTable('associado.associado').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('parentesco_id').nullable().unsigned().references('id').inTable('public.parentesco').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('raca_id').nullable().unsigned().references('id').inTable('public.raca').onDelete('SET NULL').onUpdate('SET NULL')
          table.integer('especie_id').nullable().unsigned().references('id').inTable('public.especie').onDelete('SET NULL').onUpdate('SET NULL')
          table.integer('situacao_id').notNullable().unsigned().references('id').inTable('public.situacao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('nome', 100).notNullable()
          table.string('cpf', 11).nullable()
          table.decimal('altura', 10, 2).nullable()
          table.decimal('peso', 10, 2).nullable()
          table.string('cor', 50).nullable()
          table.string('porte', 3).nullable()
          table.date('data_nascimento').notNullable()
          table.date('data_filiacao').notNullable()
          table.date('data_falecimento').nullable()
          table.date('data_inicio_carencia').nullable()
          table.date('data_fim_carencia').nullable()
          table.integer('tipo').notNullable().defaultTo(1).comment('Tipo dependente: 1-Humano 2-Pet')
          table.boolean('cremacao').notNullable().defaultTo(false)
          table.date('filiacao_cremacao').nullable()
          table.date('data_inicio_carencia_cremacao').nullable()
          table.date('data_fim_carencia_cremacao').nullable()
          table.timestamp('cadastro_cremacao', { useTz: true }).nullable()
          table.string('usuario_cremacao', 100).nullable()
          table.integer('situacao_cremacao_id').nullable().unsigned().references('id').inTable('public.situacao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('adicional_id').nullable().unsigned().references('id').inTable('cobranca.adicional').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas rotas de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'dependente' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}