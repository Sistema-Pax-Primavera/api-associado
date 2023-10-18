import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Negociacao from 'App/Models/Negociacao'
import CreateNegociacaoValidator from 'App/Validators/CreateNegociacaoValidator'

export default class NegociacaoController {

    /**
     * Método para cadastrar negociação.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof NegociacaoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                associadoId, cobradorId, tipo, status, motivo,
                valorTotal, valorDesconto, porcentagemDesconto,
                valorPagar, porcentagemPermitida, quantidadeParcela
            } = await request.validate(CreateNegociacaoValidator)

            // Insere o registro no banco de dados.
            const negociacao = await Negociacao.create({
                associadoId, cobradorId, tipo, status, motivo,
                valorTotal, valorDesconto, porcentagemDesconto,
                valorPagar, porcentagemPermitida, quantidadeParcela,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: negociacao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar negociação.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof NegociacaoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca a negociação pelo id informado.
            let negociacao = await Negociacao.findOrFail(params.id)

            // Valida os campos informados.
            const {
                associadoId, cobradorId, tipo, status, motivo,
                valorTotal, valorDesconto, porcentagemDesconto,
                valorPagar, porcentagemPermitida, quantidadeParcela
            } = await request.validate(CreateNegociacaoValidator)

            // Atualiza o objeto com os dados novos.
            negociacao = {
                ...negociacao,
                associadoId, cobradorId, tipo, status, motivo,
                valorTotal, valorDesconto, porcentagemDesconto,
                valorPagar, porcentagemPermitida, quantidadeParcela,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await negociacao.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: negociacao
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar negociação.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof NegociacaoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca a negociação pelo id informado.
            const negociacao = await Negociacao.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            negociacao.ativo = !negociacao.ativo
            negociacao.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await negociacao.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${negociacao.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: negociacao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos as negociaçãos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof NegociacaoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos as negociaçãos existentes.
            const negociacoes = await Negociacao.query()

            // Verifica se não foi retornado nenhum registro.
            if (negociacoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: negociacoes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar as negociações ativas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof NegociacaoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos as negociações ativas.
            const negociacoes = await Negociacao.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (negociacoes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: negociacoes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar a negociação por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof NegociacaoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca a negociação pelo id informado.
            const negociacao = await Negociacao.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: negociacao
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
