// === CONTROLE DO FORMULÁRIO E BLOQUEIO DE HORÁRIOS ===

document.addEventListener("DOMContentLoaded", function() {
    // Insere o ano atual automaticamente na interface
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }

    const inputDia = document.getElementById('dia');
    const inputMes = document.getElementById('mes');
    const form = document.getElementById('form-agendamento');

    // Monitora a digitação da data para atualizar os horários na tela
    if (inputDia && inputMes) {
        inputDia.addEventListener('input', atualizarHorariosDisponiveis);
        inputMes.addEventListener('input', atualizarHorariosDisponiveis);
    }

    // Gerencia o envio do formulário diretamente por aqui
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede a página de recarregar
            processarAgendamento();  // Trava o horário localmente e dispara o WhatsApp
        });
    }
});

// Função que monta a chave da data de forma padronizada (ex: "05/07/2026")
function obterChaveData() {
    const dia = document.getElementById('dia').value.padStart(2, '0');
    const mes = document.getElementById('mes').value.padStart(2, '0');
    const ano = document.getElementById('ano-atual').textContent;
    return `${dia}/${mes}/${ano}`;
}

// Função que varre os botões e desativa os horários já ocupados
function atualizarHorariosDisponiveis() {
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    if (!dia || !mes) return;

    const dataSelecionada = obterChaveData();
    const agendamentosOcupados = JSON.parse(localStorage.getItem('agendamentos_ocupados')) || {};
    const horariosBloqueados = agendamentosOcupados[dataSelecionada] || [];

    const slots = document.querySelectorAll('.time-slot');

    slots.forEach(slot => {
        const inputRadio = slot.querySelector('input');
        const horaValue = inputRadio.value;

        if (horariosBloqueados.includes(horaValue)) {
            slot.classList.add('disabled');
            inputRadio.disabled = true;
            inputRadio.checked = false; // Desmarca se o usuário já tinha clicado nele
        } else {
            slot.classList.remove('disabled');
            inputRadio.disabled = false;
        }
    });
}

// Função intermediária: salva a escolha do cliente antes de enviar
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

    // Salva na memória do navegador para ficar indisponível
    const agendamentosOcupados = JSON.parse(localStorage.getItem('agendamentos_ocupados')) || {};
    if (!agendamentosOcupados[dataSelecionada]) {
        agendamentosOcupados[dataSelecionada] = [];
    }
    
    if (!agendamentosOcupados[dataSelecionada].includes(horarioSelecionado)) {
        agendamentosOcupados[dataSelecionada].push(horarioSelecionado);
    }
    
    localStorage.setItem('agendamentos_ocupados', JSON.stringify(agendamentosOcupados));

    // Atualiza visualmente a tela
    atualizarHorariosDisponiveis();

    // Dispara a mensagem para o WhatsApp
    enviarParaWhatsApp();
}


// === SUA FUNÇÃO ORIGINAL DO WHATSAPP (ORGANIZADA) ===

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

    const area = areaSelecionada.value;
    const horario = horarioSelecionado.value;
    const dataFormatada = `${dia}/${mes}/${ano}`;
    const numeroEscritorio = "5521964432126"; 

    const textoMensagem = `Olá, Dra. Taiane Freitas! Gostaria de confirmar meu agendamento de consulta presencial.%0A%0A` +
                          `• *Nome do Cliente:* ${nome}%0A` +
                          `• *Área de Atendimento:* ${area}%0A` +
                          `• *Data:* ${dataFormatada}%0A` +
                          `• *Horário:* ${horario}h%0A` +
                          `• *Assunto desejado:* ${assunto}`;
    
    window.open(`https://wa.me/${numeroEscritorio}?text=${textoMensagem}`, '_blank');
}
