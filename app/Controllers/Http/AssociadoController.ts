import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomError from 'App/Exceptions/CustomError'
import AssociadoService from 'App/Services/AssociadoServices'
import handleResponse from 'App/Utils/HandleResponse'

export default class AssociadoController {

    private service = new AssociadoService()

    /**
     * Método para cadastrar banco.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AssociadoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        await handleResponse(async ()=>{
            return await this.service.cadastrar(request.all())
        }, response)
    }

    /**
     * Método para atualizar banco.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AssociadoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        const { id } = params;
        if (!Number.isInteger(Number(id))) {
            throw new CustomError('Parâmetro inválido.', 400);
        }

        await handleResponse(async () => {
            return await this.service.atualizar(request.all(), id);
        }, response);
    }

    /**
     * Método para ativar/inativar banco.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AssociadoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        const { id } = params;
        if (!Number.isInteger(Number(id))) {
            throw new CustomError('Parâmetro inválido.', 400);
        }

        await handleResponse(async () => {
            return await this.service.ativar(id);
        }, response);
    }

    /**
     * Método para buscar todos os bancos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AssociadoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        await handleResponse(async () => {
            return await this.service.buscarTodos();
        }, response);
    }

    /**
     * Método para buscar os bancos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AssociadoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        await handleResponse(async () => {
            return await this.service.buscarAtivos();
        }, response);
    }

    /**
     * Método para buscar o banco por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AssociadoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        await handleResponse(async () => {
            const { id } = params;
            if (!Number.isInteger(Number(id))) {
                throw new CustomError('Parâmetro inválido.', 400);
            }
            
            return await this.service.buscarPorId(id);
        }, response);
    }
}
