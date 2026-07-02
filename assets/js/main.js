// ... dentro de atualizarHorariosDisponiveis, após obter horariosBloqueados:

const agora = new Date();
const diaAtual = agora.getDate();
const mesAtual = agora.getMonth() + 1; // O mês no JS começa em 0
const horaAtual = agora.getHours();

// Verifica se a data selecionada é hoje
const isHoje = (parseInt(dia) === diaAtual && parseInt(mes) === mesAtual);

slots.forEach(slot => {
    const inputRadio = slot.querySelector('input');
    const horaValue = parseInt(inputRadio.value); // Converte "11:00" para 11

    // Regra 1: Bloqueia se já estiver no localStorage
    // Regra 2: Bloqueia se for hoje E o horário já tiver passado
    const horarioPassado = (isHoje && horaValue <= horaAtual);

    if (horariosBloqueados.includes(inputRadio.value) || horarioPassado) {
        slot.classList.add('disabled');
        inputRadio.disabled = true;
        inputRadio.checked = false;
    } else {
        slot.classList.remove('disabled');
        inputRadio.disabled = false;
    }
});
