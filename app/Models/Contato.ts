import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Utils/Format'
import { DateTime } from 'luxon'

export default class Contato extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.contato'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado ao contato.
  @column()
  public associadoId: number

  // Indica o tipo de contato: 1-Telefone 2-Celular 3-Email 4-WhatsApp 5-Outros.
  @column()
  public tipo: number

  // Descricao do contato.
  @column()
  public descricao: string

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
  * @param {Contato} contato - O objeto Contato a ser formatado.
  *
  * @memberOf Contato
  */
  @beforeSave()
  public static async formatFields(contato: Contato) {
    contato.createdBy = formatarString(contato.createdBy)
    contato.updatedBy = formatarString(contato.updatedBy)
  }
}
