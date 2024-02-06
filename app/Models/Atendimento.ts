import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarData, formatarString } from 'App/Utils/Format'
import { DateTime } from 'luxon'

export default class Atendimento extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.atendimento'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado ao atendimento.
  @column()
  public associadoId: number

  // ID do tipo vinculado ao atendimento.
  @column()
  public tipoAtendimentoId: number | null | undefined

  // ID do sub-tipo vinculado ao atendimento.
  @column()
  public subTipoAtendimentoId: number | null | undefined

  // Data do contato com o associado.
  @column()
  public dataContato: string | DateTime | Date | null | undefined

  // Data/Hora de retorno do contato com o associado.
  @column()
  public dataRetorno: DateTime | null | undefined

  // Status do atendimento: 0-Pendente  1-Finalizado  2-Retorno.
  @column()
  public status: number

  // Data/Hora do início do atendimento.
  @column()
  public inicioAtendimento: DateTime | null | undefined

  // Data/Hora do fim do atendimento.
  @column()
  public fimAtendimento: DateTime | null | undefined

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
  * @param {Atendimento} atendimento - O objeto Atendimento a ser formatado.
  *
  * @memberOf Atendimento
  */
  @beforeSave()
  public static async formatFields(atendimento: Atendimento) {
    atendimento.dataContato = formatarData(atendimento.dataContato)
    atendimento.createdBy = formatarString(atendimento.createdBy)
    atendimento.updatedBy = formatarString(atendimento.updatedBy)
  }
}
