document.addEventListener("DOMContentLoaded", function() {
    // Configura a data mínima no calendário para ser hoje
    const inputData = document.getElementById('data-consulta');
    if (inputData) {
        const hoje = new Date().toISOString().split('T')[0];
        inputData.setAttribute('min', hoje);
    }

    const form = document.getElementById('form-agendamento');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            enviarParaWhatsApp();
        });
    }
});

function enviarParaWhatsApp() {
    const nome = document.getElementById('nome').value;
    const dataInput = document.getElementById('data-consulta').value;
    const assunto = document.getElementById('assunto').value || "Não informado";
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');

    // Validação de preenchimento
    if (!nome || !areaSelecionada || !horarioSelecionado || !dataInput) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Formatação da data (recebemos yyyy-mm-dd do HTML5)
    const [ano, mes, dia] = dataInput.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Montagem da mensagem
    const mensagem = `Olá, Dra. Taiane! Gostaria de agendar:

Nome: ${nome}
Área: ${areaSelecionada.value}
Data: ${dataFormatada}
Horário: ${horarioSelecionado.value}h
Assunto: ${assunto}`;

    // Abertura do link do WhatsApp
    const url = `https://wa.me/5521964432126?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}
