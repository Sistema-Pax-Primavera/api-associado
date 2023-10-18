import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Historico from 'App/Models/Historico'
import CreateHistoricoValidator from 'App/Validators/CreateHistoricoValidator'

export default class HistoricoController {

    /**
     * Método para cadastrar histórico.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof HistoricoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { associadoId, categoriaId, subCategoriaId, descricao } = await request.validate(CreateHistoricoValidator)

            // Insere o registro no banco de dados.
            const historico = await Historico.create({
                associadoId, categoriaId, subCategoriaId,
                descricao, createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: historico
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar histórico.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof HistoricoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o histórico pelo id informado.
            let historico = await Historico.findOrFail(params.id)

            // Valida os campos informados.
            const { associadoId, categoriaId, subCategoriaId, descricao } = await request.validate(CreateHistoricoValidator)

            // Atualiza o objeto com os dados novos.
            historico = {
                ...historico,
                associadoId, categoriaId, subCategoriaId,
                descricao, updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await historico.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: historico
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar histórico.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof HistoricoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o histórico pelo id informado.
            const historico = await Historico.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            historico.ativo = !historico.ativo
            historico.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await historico.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${historico.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: historico
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os históricos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof HistoricoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os históricos existentes.
            const historicos = await Historico.query()

            // Verifica se não foi retornado nenhum registro.
            if (historicos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: historicos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os históricos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof HistoricoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os históricos ativos.
            const historicos = await Historico.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (historicos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: historicos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o histórico por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof HistoricoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o histórico pelo id informado.
            const historico = await Historico.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: historico
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
