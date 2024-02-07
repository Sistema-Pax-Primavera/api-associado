import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Associado extends BaseModel {
  public static table = 'associado.associado'

  @column({ isPrimary: true })
  public id: number

  // ID da unidade associada a este associado.
  @column()
  public unidadeId: number

  // ID da situação do associado.
  @column()
  public situacaoId: number

  // Nome do associado.
  @column()
  public nome: string

  // RG do associado.
  @column()
  public rg: string

  // CPF ou CNPJ do associado.
  @column()
  public cpfCnpj: string | null | undefined

  // Data de nascimento do associado.
  @column.date()
  public dataNascimento: DateTime

  // Data de falecimento do associado.
  @column.date()
  public dataFalecimento: DateTime | null | undefined

  // Estado civil do associado.
  @column()
  public estadoCivilId: number

  // Religião do associado.
  @column()
  public religiaoId: number

  // Naturalidade do associado.
  @column()
  public naturalidade: string | null | undefined

  // Nacionalidade do associado (True - Brasileiro, False - Estrangeiro).
  @column()
  public nacionalidade: boolean

  // Profissão do associado.
  @column()
  public profissao: string | null | undefined

  // Gênero do associado (1 - Masculino, 2 - Feminino, 3 - Não Binário, 4 - Indefinido)
  @column()
  public sexo: number | null | undefined

  // Indica se o associado possui cremação.
  @column()
  public cremacao: boolean

  // ID do adicional de cremação que o associado possui.
  @column()
  public adicionalId: number | null | undefined

  // Data de filiação da cremação.
  @column.date()
  public filiacaoCremacao: DateTime | null | undefined

  // Data inicío da carência da cremação.
  @column.date()
  public dataInicioCarenciaCremacao: DateTime | null | undefined

  // Data fim da carência da cremação.
  @column.date()
  public dataFimCarenciaCremacao: DateTime | null | undefined

  // Data cadastro da cremação.
  @column.dateTime()
  public cadastroCremacao: DateTime | null | undefined

  // Nome do usuário que cadastrou a cremação.
  @column()
  public usuarioCremacao: string | null | undefined

  // ID da situação da cremação do associado.
  @column()
  public situacaoCremacaoId: number | null | undefined

  // Número de contrato do plano.
  @column()
  public contrato: number

  // Número de contrato do plano do cemitério.
  @column()
  public contratoCemiterio: number | null | undefined

  // Indica se o endereço comercial é o mesmo do residencial.
  @column()
  public enderecoComercial: boolean

  // ID do município vinculado ao endereço residencial do associado.
  @column()
  public municipioId: number

  // ID do bairro vinculado ao endereço residencial do associado.
  @column()
  public bairroId: number

  // CEP do endereço residencial do associado.
  @column()
  public cep: string

  // Estado (UF) do endereço residencial do associado.
  @column()
  public estado: string

  // Rua do endereço residencial do associado.
  @column()
  public rua: string

  // Logradouro do endereço residencial do associado.
  @column()
  public logradouro: string

  // Quadra do endereço residencial do associado.
  @column()
  public quadra: string | null | undefined

  // Lote do endereço residencial do associado.
  @column()
  public lote: string | null | undefined

  // Número do endereço residencial do associado.
  @column()
  public numero: string | null | undefined

  // Complemento do endereço residencial do associado.
  @column()
  public complemento: string | null | undefined

  // ID do município vinculado ao endereço de cobrança do associado.
  @column()
  public municipioCobrancaId: number

  // ID do bairro vinculado ao endereço de cobrança do associado.
  @column()
  public bairroCobrancaId: number

  // CEP do endereço de cobrança do associado.
  @column()
  public cepCobranca: string

  // Estado (UF) do endereço de cobrança do associado.
  @column()
  public estadoCobranca: string

  // Rua do endereço de cobrança do associado.
  @column()
  public ruaCobranca: string

  // Logradouro do endereço de cobrança do associado.
  @column()
  public logradouroCobranca: string

  // Quadra do endereço de cobrança do associado.
  @column()
  public quadraCobranca: string | null | undefined

  // Lote do endereço de cobrança do associado.
  @column()
  public loteCobranca: string | null | undefined

  // Número do endereço de cobrança do associado.
  @column()
  public numeroCobranca: string | null | undefined

  // Complemento do endereço de cobrança do associado.
  @column()
  public complementoCobranca: string | null | undefined

  // ID do plano vinculado ao associado.
  @column()
  public planoId: number

  // Data de cadastro do contrato.
  @column.date()
  public dataContrato: DateTime

  // Data inicío da carência do contrato.
  @column.date()
  public dataInicioCarencia: DateTime | null | undefined

  // Data fim da carência do contrato.
  @column.date()
  public dataFimCarencia: DateTime | null | undefined

  // Data da primeia parcela a ser paga.
  @column.date()
  public dataPrimeiraParcela: DateTime

  // Dia de vencimento das parcelas.
  @column()
  public diaPagamento: number

  // Data do último pagamento realizado.
  @column.date()
  public ultimoPagamento: DateTime | null | undefined

  // Data do último mês pago.
  @column.date()
  public ultimoMesPago: DateTime | null | undefined

  // ID do cobrador associado ao plano.
  @column()
  public cobradorId: number

  // ID da região associada ao plano.
  @column()
  public regiaoId: number

  // ID da rota associada ao plano.
  @column()
  public rotaId: number

  // ID do cobrador associado ao plano.
  @column()
  public cobradorTemporarioId: number | null | undefined

  // ID da região associada ao plano.
  @column()
  public regiaoTemporariaId: number | null | undefined

  // ID da rota associada ao plano.
  @column()
  public rotaTemporariaId: number | null | undefined 

  // ID do vendedor associado ao plano.
  @column()
  public vendedorId: number

  // ID da concorrente em caso de transferência.
  @column()
  public concorrenteId: number | null | undefined

  // Data de cancelamento do plano.
  @column.date()
  public dataCancelamento: DateTime | null | undefined

  // Data de quitação do plano.
  @column.date()
  public dataQuitacao: DateTime | null | undefined

  // Data de cadastro do plano anterior.
  @column.date()
  public dataContratoAnterior: DateTime | null | undefined

  // Último mês pago do plano anterior.
  @column.date()
  public ultimoMesPagoAnterior: DateTime | null | undefined

  // Empresa assistencial do plano anterior.
  @column()
  public empresaAnterior: string | null | undefined

  // Observação do contrato.
  @column()
  public observacao: string | null | undefined

  // Local de cobrança ideal (1 - Escritório, 2 - Boleto, 3 - Cobrança Residencial, 4 - Cobrança Comercial, 4 - Pagamento Recorrente).
  @column()
  public localCobranca: number

  // Horário de cobrança ideal.
  @column.dateTime()
  public horarioCobranca: DateTime | null | undefined

  // Indica se o termo de reajuste foi entregue.
  @column()
  public termoReajuste: boolean | null | undefined

  // Indica se o termo de reajuste foi entregue.
  @column()
  public boletoEntregue: boolean | null | undefined

  // Indica se o termo de reajuste foi entregue.
  @column()
  public tipoEntregaBoleto: boolean | null | undefined

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column()
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null | undefined

  @beforeSave()
  public static async format(data: Associado){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}