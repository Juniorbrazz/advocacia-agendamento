// === CONTROLE DO FORMULÁRIO (SEM BLOQUEIO DE HORÁRIOS) ===

document.addEventListener("DOMContentLoaded", function() {
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) elementoAno.textContent = new Date().getFullYear();

    const form = document.getElementById('form-agendamento');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            processarAgendamento();
        });
    }
});

// Função que processa o envio para o WhatsApp diretamente
function processarAgendamento() {
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const radioSelecionado = document.querySelector('input[name="horario"]:checked');

    if (!dia || !mes || !radioSelecionado) {
        alert("Por favor, preencha a data e escolha um horário disponível.");
        return;
    }

    // Dispara o envio para o WhatsApp sem salvar nada no localStorage
    enviarParaWhatsApp();
}

// === FUNÇÃO DE ENVIO PARA O WHATSAPP ===
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
