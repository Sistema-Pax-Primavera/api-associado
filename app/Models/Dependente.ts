import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarData, formatarDecimal, formatarNumero, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Dependente extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.dependente'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado ao dependente.
  @column()
  public associadoId: number

  // ID do parentesco vinculado ao dependente.
  @column()
  public parentescoId: number | null | undefined

  // ID da raça vinculado ao dependente(PET).
  @column()
  public racaId: number | null | undefined

  // ID da espécie vinculado ao dependente(PET).
  @column()
  public especieId: number | null | undefined

  // ID da situação do dependente.
  @column()
  public situacaoId: number

  // Nome do dependente.
  @column()
  public nome: string | null

  // CPF do dependente.
  @column()
  public cpf: string | null | undefined

  // Altura do dependente(PET). 
  @column()
  public altura: number | null | undefined

  // Peso do dependente(PET). 
  @column()
  public peso: number | null | undefined

  // Cor do dependente(PET).
  @column()
  public cor: string | null | undefined

  // Porte do dependente(PET).
  @column()
  public porte: string | null | undefined

  // Data de nascimento do dependente.
  @column()
  public dataNascimento: string | DateTime | Date | null | undefined

  // Data de filiação do dependente.
  @column()
  public dataFiliacao: string | DateTime | Date | null | undefined

  // Data de falecimento do dependente.
  @column()
  public dataFalecimento: string | DateTime | Date | null | undefined

  // Data início da carência do dependente.
  @column()
  public dataInicioCarencia: string | DateTime | Date | null | undefined

  // Data fim da carência do dependente.
  @column()
  public dataFimCarencia: string | DateTime | Date | null | undefined

  // Tipo dependente: 1-Humano 2-Pet
  @column()
  public tipo: number

  // Indica se o dependente possui direito a cremação.
  @column()
  public cremacao: boolean

  // Data de filiação da cremação do dependente.
  @column()
  public filiacaoCremacao: string | DateTime | Date | null | undefined

  // Data início da carência da cremação do dependente.
  @column()
  public dataInicioCarenciaCremacao: string | DateTime | Date | null | undefined

  // Data fim da carência da cremação do dependente.
  @column()
  public dataFimCarenciaCremacao: string | DateTime | Date | null | undefined

  // Data/Hora do cadastro da cremação.
  @column()
  public cadastroCremacao: DateTime | null | undefined

  // Usuário que cadastrou a cremação.
  @column()
  public usuarioCremacao: string | null | undefined

  // ID da situação da cremação do dependente.
  @column()
  public situacaoCremacaoId: number

  // ID do adicional de cremação.
  @column()
  public adicionalId: number

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
  * @param {Dependente} dependente - O objeto Dependente a ser formatado.
  *
  * @memberOf Dependente
  */
  @beforeSave()
  public static async formatFields(dependente: Dependente) {
    dependente.nome = formatarString(dependente.nome)
    dependente.cpf = formatarNumero(dependente.cpf)
    dependente.altura = formatarDecimal(dependente.altura)
    dependente.peso = formatarDecimal(dependente.peso)
    dependente.cor = formatarString(dependente.cor)
    dependente.porte = formatarString(dependente.porte)
    dependente.dataNascimento = formatarData(dependente.dataNascimento)
    dependente.dataFiliacao = formatarData(dependente.dataFiliacao)
    dependente.dataFalecimento = formatarData(dependente.dataFalecimento)
    dependente.dataInicioCarencia = formatarData(dependente.dataInicioCarencia)
    dependente.dataFimCarencia = formatarData(dependente.dataFimCarencia)
    dependente.filiacaoCremacao = formatarData(dependente.filiacaoCremacao)
    dependente.dataInicioCarenciaCremacao = formatarData(dependente.dataInicioCarenciaCremacao)
    dependente.dataFimCarenciaCremacao = formatarData(dependente.dataFimCarenciaCremacao)
    dependente.createdBy = formatarString(dependente.createdBy)
    dependente.updatedBy = formatarString(dependente.updatedBy)
  }
}
