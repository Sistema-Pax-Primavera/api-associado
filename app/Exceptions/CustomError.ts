import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new CustomErrorException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class CustomError extends Exception {
  constructor (message: string, status: number = 500, code: string = 'E_CUSTOM_ERROR') {
    super(message, status, code)
    this.message = message
    this.status = status
    this.code = code
  }

  /**
   * Report exception to sentry or any other
   * error tracking service
   */
  public report () {
    // Você pode adicionar lógica de relatório aqui
  }

  /**
   * Handle exception and send response
   */
  public async handle (error: CustomError, { response }: HttpContextContract) {
    response.status(error.status).send({
      status: false,
      message: error.message
    })
  }
}
