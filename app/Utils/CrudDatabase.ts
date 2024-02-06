import Database from '@ioc:Adonis/Lucid/Database'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class CrudDatabase<T extends typeof BaseModel> {
    model: T

    constructor(model: T) {
        this.model = model
    }

    public async insert(data: object, transaction?: any) {
        try {
            if (typeof data === 'object' && data !== null) {
                const newDocument = await this.model.create(data, { client: transaction })
                return { status: true, message: "Inserção bem-sucedida", data: newDocument }
            } else {
                return { status: false, message: "Inserção falhou", error: "Dados inválidos" }
            }
        } catch (error) {
            return { status: false, message: "Inserção falhou", error: error.message }
        }
    }

    public async update(id: number, data: object, transaction?: any) {
        try {
            const document = await this.model.find(id)
            if (!document) {
                return { status: false, message: "Documento não encontrado" }
            }

            if (typeof data === 'object' && data !== null) {
                if (transaction) {
                    await document.merge(data).useTransaction(transaction).save()
                } else {
                    await document.merge(data).save()
                }
                return { status: true, message: "Atualização bem-sucedida" }
            } else {
                return { status: false, message: "Atualização falhou", error: "Dados inválidos" }
            }
        } catch (error) {
            return { status: false, message: "Atualização falhou", error: error.message }
        }
    }

    public async activate(id: number, transaction?: any) {
        try {
            const document = await this.model.find(id)
            if (!document) {
                return { status: false, message: "Documento não encontrado" }
            }

            if (transaction) {
                await document.merge({
                    ativo: !document.$getAttribute("ativo")
                } as Partial<any>)
                    .useTransaction(transaction)
                    .save()
            } else {
                await document.merge({
                    ativo: !document.$getAttribute("ativo")
                } as Partial<any>).save()
            }

            return { status: true, message: "Atualização bem-sucedida" }
        } catch (error) {
            return { status: false, message: "Atualização falhou", error: error.message }
        }
    }

    public async delete(id: number, transaction?: any) {
        try {
            const document = await this.model.find(id)
            if (!document) {
                return { status: false, message: "Documento não encontrado" }
            }

            if (transaction) {
                await document.useTransaction(transaction).delete()
            } else {
                await document.delete()
            }

            return { status: true, message: "Documento excluido" }
        } catch (error) {
            return { status: false, message: "Exclusão falhou", error: error.message }
        }
    }

    public async findAll() {
        try {
            const documents = await this.model.all()
            return { status: true, data: documents }
        } catch (error) {
            return { status: false, message: 'Find all failed', error: error.message }
        }
    }

    public async findById(id: number) {
        try {
            const document = await this.model.find(id)
            if (!document) {
                return { status: false, message: 'Document not found' }
            }
            return { status: true, data: document }
        } catch (error) {
            return { status: false, message: 'Find by id failed', error: error.message }
        }
    }

    public async findByFilter(filter: object) {
        try {
            const documents = await this.model.query().where(filter)
            return { status: true, data: documents }
        } catch (error) {
            return { status: false, message: 'Find by filter failed', error: error.message }
        }
    }

    public async findQuery(query: string, params: object) {
        try {
            const documents = Database.rawQuery(query, params as Partial<any>)
            return { status: true, data: documents }
        } catch (error) {
            return { status: false, message: 'Find by filter failed', error: error.message }
        }
    }
}