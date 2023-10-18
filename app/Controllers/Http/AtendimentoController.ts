import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Atendimento from 'App/Models/Atendimento'
import CreateAtendimentoValidator from 'App/Validators/CreateAtendimentoValidator'

export default class AtendimentoController {

    /**
     * Método para cadastrar atendimento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AtendimentoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                associadoId, tipoAtendimentoId, subTipoAtendimentoId, dataContato,
                dataRetorno, status, inicioAtendimento, fimAtendimento
            } = await request.validate(CreateAtendimentoValidator)

            // Insere o registro no banco de dados.
            const atendimento = await Atendimento.create({
                associadoId, tipoAtendimentoId, subTipoAtendimentoId, dataContato,
                dataRetorno, status, inicioAtendimento, fimAtendimento,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: atendimento
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar atendimento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AtendimentoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o atendimento pelo id informado.
            let atendimento = await Atendimento.findOrFail(params.id)

            // Valida os campos informados.
            const {
                associadoId, tipoAtendimentoId, subTipoAtendimentoId, dataContato,
                dataRetorno, status, inicioAtendimento, fimAtendimento
            } = await request.validate(CreateAtendimentoValidator)

            // Atualiza o objeto com os dados novos.
            atendimento = {
                ...atendimento,
                associadoId, tipoAtendimentoId, subTipoAtendimentoId, dataContato,
                dataRetorno, status, inicioAtendimento, fimAtendimento,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await atendimento.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: atendimento
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar atendimento.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AtendimentoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o atendimento pelo id informado.
            const atendimento = await Atendimento.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            atendimento.ativo = !atendimento.ativo
            atendimento.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await atendimento.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${atendimento.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: atendimento
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os atendimentos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AtendimentoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os atendimentos existentes.
            const atendimentos = await Atendimento.query()

            // Verifica se não foi retornado nenhum registro.
            if (atendimentos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: atendimentos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os atendimentos ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AtendimentoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os atendimentos ativos.
            const atendimentos = await Atendimento.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (atendimentos.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: atendimentos
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o atendimento por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof AtendimentoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o atendimento pelo id informado.
            const atendimento = await Atendimento.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: atendimento
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
