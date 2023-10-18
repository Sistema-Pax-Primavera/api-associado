import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Dependente from 'App/Models/Dependente'
import CreateDependenteValidator from 'App/Validators/CreateDependenteValidator'

export default class DependenteController {

    /**
     * Método para cadastrar dependente.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DependenteController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                associadoId, parentescoId, racaId, especieId, situacaoId, nome,
                cpf, altura, peso, cor, porte, dataNascimento, dataFiliacao,
                dataFalecimento, dataInicioCarencia, dataFimCarencia, tipo,
                cremacao, filiacaoCremacao, dataInicioCarenciaCremacao,
                dataFimCarenciaCremacao, cadastroCremacao, usuarioCremacao
            } = await request.validate(CreateDependenteValidator)

            // Insere o registro no banco de dados.
            const dependente = await Dependente.create({
                associadoId, parentescoId, racaId, especieId, situacaoId, nome,
                cpf, altura, peso, cor, porte, dataNascimento, dataFiliacao,
                dataFalecimento, dataInicioCarencia, dataFimCarencia, tipo,
                cremacao, filiacaoCremacao, dataInicioCarenciaCremacao,
                dataFimCarenciaCremacao, cadastroCremacao, usuarioCremacao,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: dependente
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar dependente.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DependenteController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o dependente pelo id informado.
            let dependente = await Dependente.findOrFail(params.id)

            // Valida os campos informados.
            const {
                associadoId, parentescoId, racaId, especieId, situacaoId, nome,
                cpf, altura, peso, cor, porte, dataNascimento, dataFiliacao,
                dataFalecimento, dataInicioCarencia, dataFimCarencia, tipo,
                cremacao, filiacaoCremacao, dataInicioCarenciaCremacao,
                dataFimCarenciaCremacao, cadastroCremacao, usuarioCremacao
            } = await request.validate(CreateDependenteValidator)

            // Atualiza o objeto com os dados novos.
            dependente = {
                ...dependente,
                associadoId, parentescoId, racaId, especieId, situacaoId, nome,
                cpf, altura, peso, cor, porte, dataNascimento, dataFiliacao,
                dataFalecimento, dataInicioCarencia, dataFimCarencia, tipo,
                cremacao, filiacaoCremacao, dataInicioCarenciaCremacao,
                dataFimCarenciaCremacao, cadastroCremacao, usuarioCremacao,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await dependente.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: dependente
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar dependente.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DependenteController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o dependente pelo id informado.
            const dependente = await Dependente.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            dependente.ativo = !dependente.ativo
            dependente.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await dependente.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${dependente.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: dependente
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os dependentes.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DependenteController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os dependentes existentes.
            const dependentes = await Dependente.query()

            // Verifica se não foi retornado nenhum registro.
            if (dependentes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: dependentes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os dependentes ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DependenteController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os dependentes ativos.
            const dependentes = await Dependente.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (dependentes.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: dependentes
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o dependente por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof DependenteController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o dependente pelo id informado.
            const dependente = await Dependente.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: dependente
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
