document.addEventListener("DOMContentLoaded", function() {
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) elementoAno.textContent = new Date().getFullYear();

    const inputDia = document.getElementById('dia');
    const inputMes = document.getElementById('mes');
    const form = document.getElementById('form-agendamento');

    if (inputDia && inputMes) {
        inputDia.addEventListener('input', atualizarHorariosDisponiveis);
        inputMes.addEventListener('input', atualizarHorariosDisponiveis);
    }

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            processarAgendamento();
        });
    }
});

function obterChaveData() {
    const dia = document.getElementById('dia').value.padStart(2, '0');
    const mes = document.getElementById('mes').value.padStart(2, '0');
    const ano = document.getElementById('ano-atual').textContent;
    return `${dia}/${mes}/${ano}`;
}

function atualizarHorariosDisponiveis() {
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    if (!dia || !mes) return;

    const dataSelecionada = obterChaveData();
    const agendamentosOcupados = JSON.parse(localStorage.getItem('agendamentos_ocupados')) || {};
    const horariosBloqueados = agendamentosOcupados[dataSelecionada] || [];

    document.querySelectorAll('.time-slot').forEach(slot => {
        const inputRadio = slot.querySelector('input');
        if (horariosBloqueados.includes(inputRadio.value)) {
            slot.classList.add('disabled');
            inputRadio.disabled = true;
            inputRadio.checked = false;
        } else {
            slot.classList.remove('disabled');
            inputRadio.disabled = false;
        }
    });
}

function processarAgendamento() {
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const radioSelecionado = document.querySelector('input[name="horario"]:checked');

    if (!dia || !mes || !radioSelecionado) {
        alert("Por favor, preencha a data e escolha um horário disponível.");
        return;
    }

    const dataSelecionada = obterChaveData();
    const horarioSelecionado = radioSelecionado.value;

    const agendamentosOcupados = JSON.parse(localStorage.getItem('agendamentos_ocupados')) || {};
    if (!agendamentosOcupados[dataSelecionada]) agendamentosOcupados[dataSelecionada] = [];
    
    if (!agendamentosOcupados[dataSelecionada].includes(horarioSelecionado)) {
        agendamentosOcupados[dataSelecionada].push(horarioSelecionado);
    }
    
    localStorage.setItem('agendamentos_ocupados', JSON.stringify(agendamentosOcupados));

    enviarParaWhatsApp();
    atualizarHorariosDisponiveis();
}

function enviarParaWhatsApp() {
    const nome = document.getElementById('nome').value;
    const dia = document.getElementById('dia').value.padStart(2, '0');
    const mes = document.getElementById('mes').value.padStart(2, '0');
    const ano = document.getElementById('ano-atual').textContent;
    const assunto = document.getElementById('assunto').value || "Não informado";
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');

    if (!nome || !areaSelecionada || !horarioSelecionado || !dia || !mes) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const textoMensagem = `Olá, Dra. Taiane Freitas! Gostaria de confirmar meu agendamento.%0A%0A` +
                          `• *Cliente:* ${nome}%0A` +
                          `• *Área:* ${areaSelecionada.value}%0A` +
                          `• *Data:* ${dia}/${mes}/${ano}%0A` +
                          `• *Horário:* ${horarioSelecionado.value}h%0A` +
                          `• *Assunto:* ${assunto}`;
    
    window.open(`https://wa.me/5521964432126?text=${textoMensagem}`, '_blank');
}
