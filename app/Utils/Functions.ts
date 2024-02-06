import { FieldOptions } from './Globals';

export default async function validateFields(data: Record<string, any>, interfaceFields: Record<string, FieldOptions>, serviceDatabase: any) {
    for (const key in interfaceFields) {
        const field = interfaceFields[key];

        // Verificar se o campo é obrigatório e está presente nos dados
        if (field.required && !data.hasOwnProperty(key)) {
            return { status: false, message: `${key} é obrigatório` };
        }

        // Validar o tipo do campo, se presente
        if (data.hasOwnProperty(key)) {
            const value = data[key];

            if (typeof value !== field.type) {
                return { status: false, message: `${key} não é do tipo ${field.type}` };
            }

            // Validar enumValues, se fornecido
            if (value && field.enumValues && Array.isArray(field.enumValues) && !field.enumValues.includes(value as never)) {
                return { status: false, message: `${key} tem um valor inválido` };
            }

            // Validar unique, se fornecido
            if (field.unique) {
                const verify = await serviceDatabase.findByFilter({ [key]: value?.toUpperCase() })
                if (verify["status"] && verify["data"].length > 0) {
                    return { status: false, message: `${key} não é único` };
                }
            }
        }
    }

    return { status: true, message: "Todos os campos são válidos" };
}
