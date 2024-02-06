import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Utils/Format'
import { DateTime } from 'luxon'

export default class Agendamento extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.agendamento'

  @column({ isPrimary: true })
  public id: number
  
  // ID do associado vinculado ao agendamento.
  @column()
  public associadoId: number

  // ID do cobrador vinculado ao agendamento.
  @column()
  public cobradorId: number | null | undefined

  // Indica o tipo do agendamento: 1-Cobrador  2-Atendimento.
  @column()
  public tipo: number

  // Status do agendamento: 0-Pendente  1-Finalizado.
  @column()
  public status: number

  // Data/Hora de retorno do agendamento.
  @column()
  public retorno: DateTime | null | undefined

  // Motivo do agendamento.
  @column()
  public motivo: string | null

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
  * @param {Agendamento} agendamento - O objeto Agendamento a ser formatado.
  *
  * @memberOf Agendamento
  */
  @beforeSave()
  public static async formatFields(agendamento: Agendamento) {
    agendamento.motivo = formatarString(agendamento.motivo)
    agendamento.createdBy = formatarString(agendamento.createdBy)
    agendamento.updatedBy = formatarString(agendamento.updatedBy)
  }
}
