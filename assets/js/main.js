// Define a data mínima como hoje, garantindo que o ano seja sempre o atual
document.addEventListener("DOMContentLoaded", function() {
    const dataInput = document.getElementById('data-consulta');
    if (dataInput) {
        const hoje = new Date().toISOString().split('T')[0];
        dataInput.setAttribute('min', hoje);
    }
});

function enviarParaWhatsApp() {
    // Coleta os valores dos campos
    const nome = document.getElementById('nome').value;
    const assunto = document.getElementById('assunto').value || "Não informado";
    const dataInput = document.getElementById('data-consulta').value;
    
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');

    // Validação obrigatória
    if (!nome || !areaSelecionada || !horarioSelecionado || !dataInput) {
        alert("Por favor, preencha todos os campos obrigatórios (Nome, Área, Data e Horário) antes de confirmar.");
        return;
    }

    // Processamento dos dados
    const area = areaSelecionada.value;
    const horario = horarioSelecionado.value;

    // Converte a data de aaaa-mm-dd para dd/mm/aaaa
    const [ano, mes, dia] = dataInput.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // Número do escritório (Dr. Taiane Freitas)
    const numeroEscritorio = "5521964432126"; 

    // Montagem da mensagem
    const textoMensagem = `Olá, Dra. Taiane Freitas! Gostaria de confirmar meu agendamento de consulta presencial.%0A%0A` +
                          `• *Nome do Cliente:* ${nome}%0A` +
                          `• *Área de Atendimento:* ${area}%0A` +
                          `• *Data:* ${dataFormatada}%0A` +
                          `• *Horário:* ${horario}h%0A` +
                          `• *Assunto desejado:* ${assunto}`;

    const urlWhatsApp = `https://wa.me/${numeroEscritorio}?text=${textoMensagem}`;
    window.open(urlWhatsApp, '_blank');
}
