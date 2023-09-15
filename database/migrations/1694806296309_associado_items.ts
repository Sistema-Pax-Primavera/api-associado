import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'associado_item'.
 *
 * Esta migração verifica se a tabela 'associado_item' já existe no banco de dados.
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
  protected tableName: string = 'associado_item'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'associado_item' se ela não existir.
   * 
   * Essa tabela é apenas para fins de auxílio. Ao cadastrar um associado com determinado plano, esses valores irão ser pré-carregados, para serem alterados e assim inseridos na tabela 'associado_item'.
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
          table.integer('associado_id').nullable().unsigned().references('id').inTable('associado.associado').onDelete('CASCADE').onUpdate('CASCADE')
          table.integer('item_id').notNullable().unsigned().references('id').inTable('public.item').onDelete('CASCADE').onUpdate('CASCADE')
          table.integer('quantidade').notNullable().defaultTo(1)
          table.decimal('valor_adesao', 10, 2).notNullable().defaultTo(0)
          table.decimal('valor_mensalidade', 10, 2).notNullable().defaultTo(0)
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas rotas de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()

          table.unique(['associado_id', 'item_id'])
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'associado_item' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}