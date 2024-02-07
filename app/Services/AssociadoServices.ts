import CustomError from "App/Exceptions/CustomError"
import Associado from "App/Models/Associado"
import CrudDatabase from "App/Utils/CrudDatabase"
import validateFields from "App/Utils/Functions"
import { FieldOptions } from "App/Utils/Globals"

interface AssociadoInterface {
    [key: string]: FieldOptions
}

const fields: AssociadoInterface = {
    ativo: { type: 'boolean', required: false, default: true },
    createdBy: { type: 'string', required: true },
    createdAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' },
    updatedBy: { type: 'string', required: false },
    updatedAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' }
}

export default class AssociadoService {
    serviceDatabase = new CrudDatabase(Associado)

    public async buscarTodos(params: object) {
        if(!Object.keys(params).every(param => Associado.$getColumn(param))){
            throw new CustomError("Parâmetros inválidos", 404)
        }
        
        return await this.serviceDatabase.findByFilter(params)
    }

    public async buscarAtivos(params: object) {
        if(!Object.keys(params).every(param => Associado.$getColumn(param))){
            throw new CustomError("Parâmetros inválidos", 404)
        }

        return await this.serviceDatabase.findByFilter({ ...params, ativo: true })
    }

    public async buscarPorId(id: number) {
        return await this.serviceDatabase.findById(id)
    }

    public async cadastrar(data: object) {
        data["createdBy"] = 'ADMIN'
        
        const verify = await validateFields(data, fields, this.serviceDatabase)
        if (!verify["status"]) throw new CustomError(verify["message"], 404)

        return await this.serviceDatabase.insert(data)
    }

    public async atualizar(data: object, id: number) {
        data["createdBy"] = 'ADMIN'
        fields["updatedBy"].required = true
        
        const verify = await validateFields(data, fields, this.serviceDatabase)
        if (!verify["status"]) throw new CustomError(verify["message"], 404)

        return await this.serviceDatabase.update(id, data)
    }

    public async ativar(id: number) {
        return await this.serviceDatabase.activate(id)
    }
}