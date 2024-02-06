import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarData, formatarDecimal, formatarString } from 'App/Utils/Format'
import { DateTime } from 'luxon'

export default class Parcela extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.parcela'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado a parcela.
  @column()
  public associadoId: number

  // ID da negociação vinculada a parcela.
  @column()
  public negociacaoId: number | null | undefined

  // Array dos IDs de pagamentos.
  @column()
  public pagamento: number[] | null | undefined

  // Data de vencimento da parcela.
  @column()
  public dataVencimento: string | DateTime | Date | null

  // Data de pagamento da parcela.
  @column()
  public dataPagamento: DateTime | null | undefined

  // Valor a ser pago.
  @column()
  public valorPagar: number | null

  // Valor da parcela.
  @column()
  public valorParcela: number | null

  // Valor adicional a parcela.
  @column()
  public valorAdicional: number | null

  // Valor da adesão.
  @column()
  public valorAdesao: number | null

  // Valor pago da parcela.
  @column()
  public valorPago: number | null | undefined

  // Tipo da parcela: 1-Parcela 2-Avulso 3-Adesão.
  @column()
  public tipo: number

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
  * @param {Parcela} parcela - O objeto Parcela a ser formatado.
  *
  * @memberOf Parcela
  */
  @beforeSave()
  public static async formatFields(parcela: Parcela) {
    parcela.dataVencimento = formatarData(parcela.dataVencimento)
    parcela.valorPagar = formatarDecimal(parcela.valorPagar)
    parcela.valorParcela = formatarDecimal(parcela.valorParcela)
    parcela.valorAdicional = formatarDecimal(parcela.valorAdicional)
    parcela.valorAdesao = formatarDecimal(parcela.valorAdesao)
    parcela.valorPago = formatarDecimal(parcela.valorPago)
    parcela.createdBy = formatarString(parcela.createdBy)
    parcela.updatedBy = formatarString(parcela.updatedBy)
  }
}
