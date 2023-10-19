import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import CartaoAssociado from 'App/Models/CartaoAssociado'
import CreateCartaoAssociadoValidator from 'App/Validators/CreateCartaoAssociadoValidator'

export default class CartaoAssociadoController {

    /**
     * Método para cadastrar cartão associado.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CartaoAssociadoController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                associadoId, dependenteId, pagamento,
                dataPagamento, valorPagar, status
            } = await request.validate(CreateCartaoAssociadoValidator)

            // Insere o registro no banco de dados.
            const cartaoAssociado = await CartaoAssociado.create({
                associadoId, dependenteId, pagamento,
                dataPagamento, valorPagar, 
                status, createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: cartaoAssociado
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar cartão associado.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CartaoAssociadoController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o cartão associado pelo id informado.
            let cartaoAssociado = await CartaoAssociado.findOrFail(params.id)

            // Valida os campos informados.
            const {
                associadoId, dependenteId, pagamento,
                dataPagamento, valorPagar, status
            } = await request.validate(CreateCartaoAssociadoValidator)

            // Atualiza o objeto com os dados novos.
            cartaoAssociado = {
                ...cartaoAssociado,
                associadoId, dependenteId, pagamento,
                dataPagamento, valorPagar, 
                status, updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await cartaoAssociado.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: cartaoAssociado
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar cartão associado.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CartaoAssociadoController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o cartão associado pelo id informado.
            const cartaoAssociado = await CartaoAssociado.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            cartaoAssociado.ativo = !cartaoAssociado.ativo
            cartaoAssociado.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await cartaoAssociado.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${cartaoAssociado.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: cartaoAssociado
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os cartões associados.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CartaoAssociadoController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os cartões associados existentes.
            const cartaoAssociados = await CartaoAssociado.query()

            // Verifica se não foi retornado nenhum registro.
            if (cartaoAssociados.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: cartaoAssociados
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os cartões associados ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CartaoAssociadoController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os cartões associados ativos.
            const cartaoAssociados = await CartaoAssociado.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (cartaoAssociados.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: cartaoAssociados
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o cartão associado por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof CartaoAssociadoController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o cartão associado pelo id informado.
            const cartaoAssociado = await CartaoAssociado.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: cartaoAssociado
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
