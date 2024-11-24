function inserir(num) {
    let visor = document.getElementById('visor');
    visor.value += num;
    visor.value = formatarExpressao(visor.value);
}

function operacao(op) {
    let visor = document.getElementById('visor');
    let ultimoCaractere = visor.value.slice(-1);
    if (['+', '-', '*', '/'].includes(ultimoCaractere)) {
        visor.value = visor.value.slice(0, -1) + op;
    } else if (visor.value !== '') {
        visor.value += op;
    }
}

function calcular() {
    let visor = document.getElementById('visor');
    try {
        // Remove os pontos dos milhares e substitui vírgulas por pontos para cálculo
        let expr = visor.value.replace(/\./g, '').replace(/,/g, '.');
        let resultado = eval(expr);
        // Formata o resultado e substitui ponto decimal por vírgula
        visor.value = formatarNumero(resultado).replace(/\./g, ',');
    } catch (e) {
        visor.value = 'Erro';
    }
}

function limpar() {
    document.getElementById('visor').value = '';
}

function formatarNumero(n) {
    let partes = n.toString().split('.');
    let parteInteira = partes[0];
    let parteDecimal = partes[1];
    parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parteDecimal ? parteInteira + ',' + parteDecimal : parteInteira;
}

function formatarExpressao(expr) {
    // Divide a expressão em números e operadores
    let tokens = expr.split(/([\+\-\*\/])/);
    for (let i = 0; i < tokens.length; i++) {
        // Se o token não é um operador
        if (!['+', '-', '*', '/'].includes(tokens[i])) {
            let num = tokens[i].replace(/\./g, ''); // Remove pontos existentes
            if (num !== '') {
                let partes = num.split(',');
                let parteInteira = partes[0];
                let parteDecimal = partes[1];
                parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                // Mantém a vírgula mesmo se parteDecimal for uma string vazia
                tokens[i] = (typeof parteDecimal !== 'undefined') ? parteInteira + ',' + parteDecimal : parteInteira;
            }
        }
    }
    return tokens.join('');
}
