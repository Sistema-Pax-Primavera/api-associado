import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { localCobranca, sexo, tipoEntregaBoleto } from 'App/Utils/Globals'

export default class CreateAssociadoValidator {
  constructor(protected ctx: HttpContextContract) { }

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    unidadeId: schema.number(),
    nome: schema.string([
      rules.maxLength(150)
    ]),
    rg: schema.string([
      rules.maxLength(30)
    ]),
    cpfCnpj: schema.string.nullableAndOptional([
      rules.cpfCnpj(),
    ]),
    dataNascimento: schema.date({ format: 'yyyy-MM-dd' }),
    dataFalecimento: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    estadoCivilId: schema.number(),
    religiaoId: schema.number(),
    naturalidade: schema.string.nullableAndOptional([
      rules.maxLength(100)
    ]),
    nacionalidade: schema.boolean(),
    profissao: schema.string.nullableAndOptional([
      rules.maxLength(100)
    ]),
    sexo: schema.enum.nullableAndOptional(sexo.flatMap((item) => item.id)),
    cremacao: schema.boolean(),
    adicionalId: schema.number.nullableAndOptional(),
    filiacaoCremacao: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    dataInicioCarenciaCremacao: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    dataFimCarenciaCremacao: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    cadastroCremacao: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd HH:mm:ss' }),
    contratoCemiterio: schema.number.nullableAndOptional(),
    enderecoComercial: schema.boolean(),
    municipioId: schema.number(),
    bairroId: schema.number(),
    cep: schema.string([
      rules.cep()
    ]),
    estado: schema.string([
      rules.regex(/^[A-Z]{2}/)
    ]),
    rua: schema.string([
      rules.maxLength(100)
    ]),
    logradouro: schema.string([
      rules.maxLength(30)
    ]),
    quadra: schema.string.nullableAndOptional([
      rules.maxLength(10)
    ]),
    lote: schema.string.nullableAndOptional([
      rules.maxLength(10)
    ]),
    numero: schema.string.nullableAndOptional([
      rules.maxLength(10)
    ]),
    complemento: schema.string.nullableAndOptional([
      rules.maxLength(100)
    ]),
    municipioCobrancaId: schema.number.nullableAndOptional(),
    bairroCobrancaId: schema.number.nullableAndOptional(),
    cepCobranca: schema.string.nullableAndOptional([
      rules.cep()
    ]),
    estadoCobranca: schema.string.nullableAndOptional([
      rules.regex(/^[A-Z]{2}/)
    ]),
    ruaCobranca: schema.string.nullableAndOptional([
      rules.maxLength(100)
    ]),
    logradouroCobranca: schema.string.nullableAndOptional([
      rules.maxLength(30)
    ]),
    quadraCobranca: schema.string.nullableAndOptional([
      rules.maxLength(10)
    ]),
    loteCobranca: schema.string.nullableAndOptional([
      rules.maxLength(10)
    ]),
    numeroCobranca: schema.string.nullableAndOptional([
      rules.maxLength(10)
    ]),
    complementoCobranca: schema.string.nullableAndOptional([
      rules.maxLength(100)
    ]),
    planoId: schema.number(),
    dataContrato: schema.date({ format: 'yyyy-MM-dd' }),
    dataInicioCarencia: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    dataFimCarencia: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    dataPrimeiraParcela: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    diaPagamento: schema.number.nullableAndOptional(),
    cobradorId: schema.number.nullableAndOptional(),
    regiaoId: schema.number.nullableAndOptional(),
    rotaId: schema.number.nullableAndOptional(),
    cobradorTemporarioId: schema.number.nullableAndOptional(),
    regiaoTemporariaId: schema.number.nullableAndOptional(),
    rotaTemporariaId: schema.number.nullableAndOptional(),
    vendedorId: schema.number.nullableAndOptional(),
    concorrenteId: schema.number.nullableAndOptional(),
    dataCancelamento: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    dataQuitacao: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    dataContratoAnterior: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    ultimoMesPagoAnterior: schema.date.nullableAndOptional({ format: 'yyyy-MM-dd' }),
    empresaAnterior: schema.string.nullableAndOptional([
      rules.maxLength(150)
    ]),
    observacao: schema.string.nullableAndOptional(),
    localCobranca: schema.enum(localCobranca.flatMap((item) => item.id)),
    horarioCobranca: schema.date.nullableAndOptional({ format: 'HH:mm:ss' }),
    termoReajuste: schema.boolean.nullableAndOptional(),
    boletoEntregue: schema.boolean.nullableAndOptional(),
    tipoEntregaBoleto: schema.enum(tipoEntregaBoleto.flatMap((item) => item.id))
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'required': 'Campo {{field}} é obrigatório',
    'maxLength': 'Campo {{field}} deve possuir tamanho máximo de {{options.maxLength}}',
    'enum': 'Campo {{field}} deve ser de uma das opções a seguir: ({{options.choices}})'
  }
}
