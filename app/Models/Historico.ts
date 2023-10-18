import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Historico extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.historico'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado ao histórico.
  @column()
  public associadoId: number

  // ID da categoria vinculada ao histórico.
  @column()
  public categoriaId: number

  // ID da sub-categoria vinculada ao histórico.
  @column()
  public subCategoriaId: number

  // Descrição do histórico.
  @column()
  public descricao: string | null

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
  * @param {Historico} historico - O objeto Historico a ser formatado.
  *
  * @memberOf Historico
  */
  @beforeSave()
  public static async formatFields(historico: Historico) {
    historico.descricao = formatarString(historico.descricao)
    historico.createdBy = formatarString(historico.createdBy)
    historico.updatedBy = formatarString(historico.updatedBy)
  }
}
