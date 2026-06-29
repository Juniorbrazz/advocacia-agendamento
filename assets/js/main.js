function enviarParaWhatsApp() {
    const nome = document.getElementById('nome').value;
    const assunto = document.getElementById('assunto').value || "Não informado";
    const dataInput = document.getElementById('data-consulta').value;
    
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const area = areaSelecionada ? areaSelecionada.value : "Não informada";

    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');
    const horario = horarioSelecionado ? horarioSelecionado.value : "Não informado";

    let dataFormatada = "Não informada";
    if (dataInput) {
        const [ano, mes, dia] = dataInput.split('-');
        dataFormatada = `${dia}/${mes}/${ano}`;
    }

    // Número real extraído do cartão de visitas virtual da Dra. Taiane
    const numeroEscritorio = "5521964432126"; 

    const textoMensagem = `Olá, Dra. Taiane Freitas! Gostaria de confirmar meu agendamento de consulta presencial.%0A%0A` +
                          `• *Nome do Cliente:* ${nome}%0A` +
                          `• *Área de Atendimento:* ${area}%0A` +
                          `• *Data:* ${dataFormatada}%0A` +
                          `• *Horário:* ${horario}h%0A` +
                          `• *Assunto desejado:* ${assunto}`;

    const urlWhatsApp = `https://wa.me/${numeroEscritorio}?text=${textoMensagem}`;
    window.open(urlWhatsApp, '_blank');
}
