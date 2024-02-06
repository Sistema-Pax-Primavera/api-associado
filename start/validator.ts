/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { validator } from '@ioc:Adonis/Core/Validator'
import { formatarNumero, validaCnpj, validaCpf } from 'App/Utils/Format'

validator.rule('cpfCnpj', (value, _, options) => {
    const cpf = validaCpf(value)
    const cnpj = validaCnpj(value)
    if(!cpf && !cnpj){
        options.errorReporter.report(options.pointer,
            'cpfCnpj',
            'O CPF ou CNPJ informado é inválido',
            options.arrayExpressionPointer)
    }
})

validator.rule('cpf', (value, _, options) => {
    const valida = validaCpf(value)
    if (!valida) {
        options.errorReporter.report(options.pointer,
            'cpf',
            'O CPF informado é inválido',
            options.arrayExpressionPointer)
    }
})

validator.rule('cnpj', (value, _, options) => {
    const valida = validaCnpj(value)
    if (!valida) {
        options.errorReporter.report(options.pointer,
            'cnpj',
            'O CNPJ informado é inválido',
            options.arrayExpressionPointer)
    }
})

validator.rule('telefone', (value, _, options) => {
    const numeroFormatado = formatarNumero(value)

    const regexBrasil = /^(\(\d{2}\)\s?|\(\d{2}\))\s?\d{4,5}-\d{4}$/
    const regexParaguai = /^(\(\d{3}\))\s?\d{3}-\d{4}$/

    if (!numeroFormatado || !regexBrasil.test(numeroFormatado) || !regexParaguai.test(numeroFormatado)) {
        options.errorReporter.report(options.pointer,
            'telefone',
            'O telefone informado é inválido',
            options.arrayExpressionPointer)
    }
})

validator.rule('cep', (value, _, options) => {
    const valida = /^[0-9]{2}\.[0-9]{3}-[0-9]{3}$/;
    if (!valida.test(value)) {
        options.errorReporter.report(options.pointer,
            'cep',
            'O CEP informado é inválido',
            options.arrayExpressionPointer)
    }
})

declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        cpfCnpj(): Rule
        cpf(): Rule
        cnpj(): Rule
        telefone(): Rule
        cep(): Rule
    }
}