import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'agendamento'.
 *
 * Esta migração verifica se a tabela 'agendamento' já existe no banco de dados.
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
  protected tableName: string = 'agendamento'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'agendamento' se ela não existir.
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
          table.integer('cobrador_id').nullable().unsigned().references('id').inTable('cobranca.cobrador').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('tipo').notNullable().comment('Indica o tipo do agendamento: 1-Cobrador  2-Atendimento')
          table.integer('status').notNullable().defaultTo(0).comment('Status do agendamento: 0-Pendente  1-Finalizado')
          table.timestamp('retorno', { useTz: true }).nullable()
          table.text('motivo').notNullable()
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
   * Exclui a tabela 'agendamento' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}