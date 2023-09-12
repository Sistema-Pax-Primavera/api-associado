import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'associado'.
 *
 * Esta migração verifica se a tabela 'associado' já existe no banco de dados.
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
  protected tableName: string = 'associado'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'associado' se ela não existir.
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

          table.integer('unidade_id').notNullable().unsigned().references('id').inTable('public.unidade').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('situacao_id').notNullable().unsigned().references('id').inTable('public.situacao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('nome', 150).notNullable()
          table.string('rg', 30).notNullable()
          table.string('cpf_cnpj', 14).nullable()
          table.date('data_nascimento').notNullable()
          table.date('data_falecimento').nullable()
          table.integer('estado_civil_id').notNullable().unsigned().references('id').inTable('public.estado_civil').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('religiao_id').notNullable().unsigned().references('id').inTable('public.religiao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('naturalidade', 100).nullable()
          table.boolean('nacionalidade').notNullable().defaultTo(true).comment('Se valor for true indica que o associado é brasileiro.')
          table.string('profissao', 100).nullable()
          table.integer('sexo').nullable().comment('1-Masculino   2-Feminino   3-Não binário   4-Indefinido')
          table.boolean('cremacao').notNullable().defaultTo(false).comment('Se valor for TRUE indica que o associado possui cremação.')
          table.integer('adicional_id').nullable().unsigned().references('id').inTable('cobranca.adicional').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.date('filiacao_cremacao').nullable()
          table.date('data_inicio_carencia_cremacao').nullable()
          table.date('data_fim_carencia_cremacao').nullable()
          table.timestamp('cadastro_cremacao', { useTz: true }).nullable()
          table.string('usuario_cremacao', 100).nullable()
          table.integer('situacao_cremacao_id').nullable().unsigned().references('id').inTable('public.situacao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('contrato').notNullable()
          table.integer('contrato_cemiterio').nullable()
          table.boolean('endereco_comercial').notNullable().defaultTo(true).comment('Se valor for TRUE indica que o endereço comercial é o mesmo do residencial.')
          //Endereço Residencial!
          table.integer('municipio_id').notNullable().unsigned().references('id').inTable('public.municipio').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('bairro_id').notNullable().unsigned().references('id').inTable('cobranca.bairro').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('cep', 8).notNullable()
          table.string('estado', 2).notNullable()
          table.string('rua', 100).notNullable()
          table.string('logradouro', 30).notNullable()
          table.string('quadra', 10).nullable()
          table.string('lote', 10).nullable()
          table.string('numero', 10).nullable()
          table.string('complemento', 100).nullable()
          // Endereço Comercial!
          table.integer('municipio_cobranca_id').notNullable().unsigned().references('id').inTable('public.municipio').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('bairro_cobranca_id').notNullable().unsigned().references('id').inTable('cobranca.bairro').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('cep_cobranca', 8).notNullable()
          table.string('estado_cobranca', 2).notNullable()
          table.string('rua_cobranca', 100).notNullable()
          table.string('logradouro_cobranca', 30).notNullable()
          table.string('quadra_cobranca', 10).nullable()
          table.string('lote_cobranca', 10).nullable()
          table.string('numero_cobranca', 10).nullable()
          table.string('complemento_cobranca', 100).nullable()
          // Cobrança!
          table.integer('plano_id').nullable().unsigned().references('id').inTable('cobranca.plano').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.date('data_contrato').nullable()
          table.date('data_inicio_carencia').nullable()
          table.date('data_fim_carencia').nullable()
          table.date('data_primeira_parcela').nullable()
          table.integer('dia_pagamento').nullable()
          table.date('ultimo_pagamento').nullable()
          table.date('ultimo_mes_pago').nullable()
          table.integer('cobrador_id').nullable().unsigned().references('id').inTable('cobranca.cobrador').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('regiao_id').nullable().unsigned().references('id').inTable('cobranca.regiao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('rota_id').nullable().unsigned().references('id').inTable('cobranca.rota').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('cobrador_temporario_id').nullable().unsigned().references('id').inTable('cobranca.cobrador').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('regiao_temporaria_id').nullable().unsigned().references('id').inTable('cobranca.regiao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('rota_temporaria_id').nullable().unsigned().references('id').inTable('cobranca.rota').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('vendedor_id').nullable().unsigned().references('id').inTable('public.usuario').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('concorrente_id').nullable().unsigned().references('id').inTable('public.concorrente').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.date('data_cancelamento').nullable()
          table.date('data_quitacao').nullable()
          table.date('data_contrato_anterior').nullable()
          table.date('ultimo_mes_pago_anterior').nullable()
          table.string('empresa_anterior', 150).nullable()
          table.text('observacao').nullable()
          table.integer('local_cobranca').notNullable().defaultTo(1).comment('1-Escritorio 2-Boleto 3-Cobrança Residencial 4-Cobrança Comercial 4-Pagamento Recorrente')
          table.time('horario_cobranca').nullable()
          table.boolean('termo_reajuste').nullable().defaultTo(false).comment('Se valor for TRUE indica que o termo foi entregue e assinado.')
          table.boolean('boleto_entregue').nullable().defaultTo(false).comment('Se valor for TRUE indica que os boletos de ajuste foram entregues.')
          table.integer('tipo_entrega_boleto').nullable().defaultTo(5).comment('1-Residencia  2-Email  3-Correios  4-WhatsApp  5-Escritorio  6-Outros')

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
   * Exclui a tabela 'associado' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}