import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Contato from 'App/Models/Contato'
import CreateContatoValidator from 'App/Validators/CreateContatoValidator'

export default class ContatoController {

    /**
     * Método para cadastrar contato.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContatoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { associadoId, tipo, descricao } = await request.validate(CreateContatoValidator)

            // Insere o registro no banco de dados.
            const contato = await Contato.create({
                associadoId, tipo, descricao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: contato
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar contato.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContatoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o contato pelo id informado.
            let contato = await Contato.findOrFail(params.id)

            // Valida os campos informados.
            const { associadoId, tipo, descricao } = await request.validate(CreateContatoValidator)

            // Atualiza o objeto com os dados novos.
            contato = {
                ...contato,
                associadoId, tipo, descricao,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await contato.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: contato
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar contato.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContatoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o contato pelo id informado.
            const contato = await Contato.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            contato.ativo = !contato.ativo
            contato.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await contato.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${contato.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: contato
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os contatos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContatoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os contatos existentes.
            const contatos = await Contato.query()

            // Verifica se não foi retornado nenhum registro.
            if (contatos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: contatos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os contatos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContatoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os contatos ativos.
            const contatos = await Contato.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (contatos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: contatos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o contato por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ContatoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o contato pelo id informado.
            const contato = await Contato.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: contato
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
