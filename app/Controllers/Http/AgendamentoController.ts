import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Agendamento from 'App/Models/Agendamento'
import CreateAgendamentoValidator from 'App/Validators/CreateAgendamentoValidator'

export default class AgendamentoController {

    /**
     * Método para cadastrar agendamento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AgendamentoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const { associadoId, cobradorId, tipo, status, retorno, motivo } = await request.validate(CreateAgendamentoValidator)

            // Insere o registro no banco de dados.
            const agendamento = await Agendamento.create({
                associadoId, cobradorId, tipo,
                status, retorno, motivo,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: agendamento
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar agendamento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AgendamentoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o agendamento pelo id informado.
            let agendamento = await Agendamento.findOrFail(params.id)

            // Valida os campos informados.
            const { associadoId, cobradorId, tipo, status, retorno, motivo } = await request.validate(CreateAgendamentoValidator)

            // Atualiza o objeto com os dados novos.
            agendamento = {
                ...agendamento,
                associadoId, cobradorId, tipo,
                status, retorno, motivo,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await agendamento.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: agendamento
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar agendamento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AgendamentoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o agendamento pelo id informado.
            const agendamento = await Agendamento.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            agendamento.ativo = !agendamento.ativo
            agendamento.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await agendamento.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${agendamento.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: agendamento
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os agendamentos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AgendamentoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os agendamentos existentes.
            const agendamentos = await Agendamento.query()

            // Verifica se não foi retornado nenhum registro.
            if (agendamentos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: agendamentos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os agendamentos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AgendamentoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os agendamentos ativos.
            const agendamentos = await Agendamento.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (agendamentos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: agendamentos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o agendamento por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AgendamentoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o agendamento pelo id informado.
            const agendamento = await Agendamento.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: agendamento
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
