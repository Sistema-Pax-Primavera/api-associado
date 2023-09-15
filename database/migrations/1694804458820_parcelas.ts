import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'parcela'.
 *
 * Esta migração verifica se a tabela 'parcela' já existe no banco de dados.
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
  protected tableName: string = 'parcela'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'parcela' se ela não existir.
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
          table.integer('negociacao_id').nullable().unsigned().references('id').inTable('associado.negociacao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.specificType('pagamento', 'integer[]').nullable()
          table.date('data_vencimento').notNullable()
          table.timestamp('data_pagamento', { useTz: true }).nullable()
          table.decimal('valor_pagar', 10, 2).notNullable()
          table.decimal('valor_parcela', 10, 2).notNullable()
          table.decimal('valor_adicional', 10, 2).notNullable().defaultTo(0)
          table.decimal('valor_adesao', 10, 2).notNullable().defaultTo(0)
          table.decimal('valor_pago', 10, 2).nullable()
          table.integer('tipo').notNullable().defaultTo(1).comment('Tipo da parcela: 1-Parcela 2-Avulso 3-Adesão')
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
   * Exclui a tabela 'parcela' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}