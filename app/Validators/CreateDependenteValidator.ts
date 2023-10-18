import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDependenteValidator {
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
    associadoId: schema.number(),
    parentescoId: schema.number.nullableAndOptional(),
    racaId: schema.number.nullableAndOptional(),
    especieId: schema.number.nullableAndOptional(),
    situacaoId: schema.number(),
    nome: schema.string([
      rules.maxLength(100)
    ]),
    cpf: schema.string.nullableAndOptional([
      rules.cpf
    ]),
    altura: schema.number.nullableAndOptional(),
    peso: schema.number.nullableAndOptional(),
    cor: schema.string([
      rules.maxLength(50)
    ]),
    porte: schema.enum.nullableAndOptional([
      'P', 'M', 'G', 'GG'
    ]),
    dataNascimento: schema.date({ format: 'DD/MM/YYYY' }),
    dataFiliacao: schema.date({ format: 'DD/MM/YYYY' }),
    dataFalecimento: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY' }),
    dataInicioCarencia: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY' }),
    dataFimCarencia: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY' }),
    tipo: schema.enum([
      1, 2
    ]),
    cremacao: schema.boolean(),
    filiacaoCremacao: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY' }),
    dataInicioCarenciaCremacao: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY' }),
    dataFimCarenciaCremacao: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY' }),
    cadastroCremacao: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY HH:mm:ss' }),
    usuarioCremacao: schema.string.nullableAndOptional([
      rules.maxLength(100)
    ])
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
