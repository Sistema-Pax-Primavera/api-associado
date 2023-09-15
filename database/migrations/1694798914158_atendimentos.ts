import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'atendimento'.
 *
 * Esta migração verifica se a tabela 'atendimento' já existe no banco de dados.
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
  protected tableName: string = 'atendimento'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'atendimento' se ela não existir.
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
          table.integer('tipo_atendimento_id').nullable().unsigned().references('id').inTable('public.tipo_atendimento_id').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('sub_tipo_atendimento_id').nullable().unsigned().references('id').inTable('public.sub_tipo_atendimento').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.date('data_contato').nullable()
          table.timestamp('data_retorno', { useTz: false }).nullable()
          table.integer('status').notNullable().defaultTo(0).comment('Status do atendimento: 0-Pendente  1-Finalizado  2-Retorno')
          table.timestamp('inicio_atendimento', { useTz: false }).nullable()
          table.timestamp('fim_atendimento', { useTz: false }).nullable()
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
   * Exclui a tabela 'atendimento' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}