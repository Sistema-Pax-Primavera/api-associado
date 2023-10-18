import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarDecimal, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Negociacao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.negociacao'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado a negociação.
  @column()
  public associadoId: number

  // ID do cobrador vinculado ao negociação.
  @column()
  public cobradorId: number | null | undefined

  // Indica o tipo do negociação: 1-Cobrador  2-Atendimento.
  @column()
  public tipo: number

  // Status do negociação: 0-Pendente  1-Finalizado.
  @column()
  public status: number

  // Motivo da negociação.
  @column()
  public motivo: string

  // Valor total da negociação sem desconto.
  @column()
  public valorTotal: string | number | null

  // Valor de desconto da negociação.
  @column()
  public valorDesconto: string | number | null

  // Porcentagem de desconto da negociação.
  @column()
  public porcentagemDesconto: string | number | null

  // Valor final a pagar.
  @column()
  public valorPagar: string | number | null

  // Porcentagem máxima permitida de desconto.
  @column()
  public porcentagemPermitida: string | number | null

  // Quantidade de parcelas negociadas.
  @column()
  public quantidadeParcela: number

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column()
  public createdBy: string | null

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null

  /**
  * Método de gancho (hook) que formata os campos do registro antes de salvá-los.
  *
  * @param {Negociacao} negociacao - O objeto Negociacao a ser formatado.
  *
  * @memberOf Negociacao
  */
  @beforeSave()
  public static async formatFields(negociacao: Negociacao) {
    negociacao.valorTotal = formatarDecimal(negociacao.valorTotal)
    negociacao.valorDesconto = formatarDecimal(negociacao.valorDesconto)
    negociacao.porcentagemDesconto = formatarDecimal(negociacao.porcentagemDesconto)
    negociacao.valorPagar = formatarDecimal(negociacao.valorPagar)
    negociacao.porcentagemPermitida = formatarDecimal(negociacao.porcentagemPermitida)
    negociacao.createdBy = formatarString(negociacao.createdBy)
    negociacao.updatedBy = formatarString(negociacao.updatedBy)
  }
}
