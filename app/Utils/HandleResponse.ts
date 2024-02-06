import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default async function handleResponse(
  callback: () => Promise<any>,
  response: HttpContextContract['response']
) {
  try {
    const result = await callback();
    response.status(200).send(result);
  } catch (error) {
    const status = error.status ?? 500;
    response.status(status).send({
        status: false,
        message: error.message
      });
  }
}
