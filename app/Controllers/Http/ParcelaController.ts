import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Parcela from 'App/Models/Parcela'
import CreateParcelaValidator from 'App/Validators/CreateParcelaValidator'

export default class ParcelaController {

    /**
     * Método para cadastrar parcela.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParcelaController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                associadoId, negociacaoId, pagamento, dataVencimento,
                dataPagamento, valorPagar, valorParcela, valorAdicional,
                valorAdesao, valorPago, tipo
            } = await request.validate(CreateParcelaValidator)

            // Insere o registro no banco de dados.
            const parcela = await Parcela.create({
                associadoId, negociacaoId, pagamento, dataVencimento,
                dataPagamento, valorPagar, valorParcela, valorAdicional,
                valorAdesao, valorPago, tipo,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: parcela
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar parcela.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParcelaController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o parcela pelo id informado.
            let parcela = await Parcela.findOrFail(params.id)

            // Valida os campos informados.
            const {
                associadoId, negociacaoId, pagamento, dataVencimento,
                dataPagamento, valorPagar, valorParcela, valorAdicional,
                valorAdesao, valorPago, tipo
            } = await request.validate(CreateParcelaValidator)

            // Atualiza o objeto com os dados novos.
            parcela = {
                ...parcela,
                associadoId, negociacaoId, pagamento, dataVencimento,
                dataPagamento, valorPagar, valorParcela, valorAdicional,
                valorAdesao, valorPago, tipo,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await parcela.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: parcela
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar parcela.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParcelaController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o parcela pelo id informado.
            const parcela = await Parcela.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            parcela.ativo = !parcela.ativo
            parcela.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await parcela.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${parcela.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: parcela
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os parcelas.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParcelaController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os parcelas existentes.
            const parcelas = await Parcela.query()

            // Verifica se não foi retornado nenhum registro.
            if (parcelas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: parcelas
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os parcelas ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParcelaController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os parcelas ativos.
            const parcelas = await Parcela.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (parcelas.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: parcelas
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o parcela por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ParcelaController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o parcela pelo id informado.
            const parcela = await Parcela.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: parcela
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
