import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarDecimal, formatarString } from 'App/Utils/Format'
import { DateTime } from 'luxon'

export default class CartaoAssociado extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.cartao_associado'

  // ID do associado.
  @column()
  public associadoId: number

  // ID do dependente.
  @column()
  public dependenteId: number | null | undefined
  
  // IDs dos pagamentos associados a este cartão.
  @column()
  public pagamento: number[] | null | undefined

  // Data de pagamento deste cartão.
  @column()
  public dataPagamento: string | DateTime | Date | null | undefined

  // Valor a ser pago.
  @column()
  public valorPagar: number | null | undefined

  // Status de emissão: 0-Pendente 1-Impresso.
  @column()
  public status: number

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
  * @param {CartaoAssociado} cartaoAssociado - O objeto CartaoAssociado a ser formatado.
  *
  * @memberOf CartaoAssociado
  */
  @beforeSave()
  public static async formatFields(cartaoAssociado: CartaoAssociado) {
    cartaoAssociado.valorPagar = formatarDecimal(cartaoAssociado.valorPagar)
    cartaoAssociado.createdBy = formatarString(cartaoAssociado.createdBy)
    cartaoAssociado.updatedBy = formatarString(cartaoAssociado.updatedBy)
  }
}
