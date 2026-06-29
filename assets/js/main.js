// Define a data mínima como hoje, garantindo que o ano seja sempre o atual
document.addEventListener("DOMContentLoaded", function() {
    // Insere o ano atual automaticamente no span com id="ano-atual"
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }
});

function enviarParaWhatsApp() {
    // Coleta os valores dos campos separados
    const nome = document.getElementById('nome').value;
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano-atual').textContent; // Pega o ano do span
    const assunto = document.getElementById('assunto').value || "Não informado";
    
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');

    // Validação obrigatória
    // Nota: Verificamos se dia e mês foram preenchidos
    if (!nome || !areaSelecionada || !horarioSelecionado || !dia || !mes) {
        alert("Por favor, preencha todos os campos obrigatórios (Nome, Área, Dia, Mês e Horário) antes de confirmar.");
        return;
    }

    // Processamento dos dados
    const area = areaSelecionada.value;
    const horario = horarioSelecionado.value;
    
    // Converte a data para dd/mm/aaaa usando o ano fixo do span
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
