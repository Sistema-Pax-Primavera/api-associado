import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAtendimentoValidator {
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
    tipoAtendimentoId: schema.number.nullableAndOptional(),
    subTipoAtendimentoId: schema.number.nullableAndOptional(),
    dataContato: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY' }),
    dataRetorno: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY HH:mm:ss' }),
    status: schema.enum([
      0, 1, 2
    ]),
    inicioAtendimento: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY HH:mm:ss' }),
    fimAtendimento: schema.date.nullableAndOptional({ format: 'DD/MM/YYYY HH:mm:ss' }),
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
