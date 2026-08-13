document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['custos', 'diasSemana', 'horasDia', 'ferias', 'lucro'].map(id => document.getElementById(id));
    const valorHoraEl = document.getElementById('valorHora');
    const faturamentoEl = document.getElementById('faturamento');

    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const calculate = () => {
        const custos = parseFloat(inputs[0].value) || 0;
        const diasSemana = parseFloat(inputs[1].value) || 0;
        const horasDia = parseFloat(inputs[2].value) || 0;
        const ferias = parseFloat(inputs[3].value) || 0;
        const lucro = parseFloat(inputs[4].value) || 0;

        const semanasAno = 52.14;
        const diasUteisAno = Math.round(diasSemana * semanasAno);
        const diasTrabalhados = Math.max(0, diasUteisAno - ferias);
        const horasAno = diasTrabalhados * horasDia;
        
        const faturamentoNecessario = custos * 12 * (1 + (lucro / 100));
        const valorHora = horasAno > 0 ? faturamentoNecessario / horasAno : 0;

        valorHoraEl.textContent = formatCurrency(valorHora);
        faturamentoEl.textContent = `Faturamento Mínimo Anual Necessário: ${formatCurrency(faturamentoNecessario)}`;
    };

    inputs.forEach(input => input.addEventListener('input', calculate));
    calculate();
});
