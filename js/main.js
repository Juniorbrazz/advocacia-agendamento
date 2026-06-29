function enviarParaWhatsApp() {
    // 1. Captura os elementos do formulário
    const nome = document.getElementById('nome').value;
    const assunto = document.getElementById('assunto').value || "Não informado";
    const dataInput = document.getElementById('data-consulta').value;
    
    // 2. Captura o rádio selecionado da Área de Atuação
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const area = areaSelecionada ? areaSelecionada.value : "Não informada";

    // 3. Captura o rádio selecionado do Horário
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');
    const horario = horarioSelecionado ? horarioSelecionado.value : "Não informado";

    // 4. Formata a data de AAAA-MM-DD para DD/MM/AAAA (padrão brasileiro)
    let dataFormatada = "Não informada";
    if (dataInput) {
        const [ano, mes, dia] = dataInput.split('-');
        dataFormatada = `${dia}/${mes}/${ano}`;
    }

    // 5. Configuração do número do escritório (Substitua pelo número real com DDD)
    // IMPORTANTE: Apenas números, com o 55 da frente. Exemplo: 5521999999999
    const numeroEscritorio = "55 21 964432126"; 

    // 6. Monta o texto da mensagem usando quebras de linha (%0A) e negrito (*)
    const textoMensagem = `Olá! Gostaria de confirmar meu agendamento de consulta presencial.%0A%0A` +
                          `• *Nome:* ${nome}%0A` +
                          `• *Área:* ${area}%0A` +
                          `• *Data:* ${dataFormatada}%0A` +
                          `• *Horário:* ${horario}h%0A` +
                          `• *Assunto:* ${assunto}`;

    // 7. Cria a URL final da API do WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroEscritorio}?text=${textoMensagem}`;
    
    // 8. Abre o WhatsApp em uma nova aba
    window.open(urlWhatsApp, '_blank');

    // 9.Opcional: Redireciona a página atual para a tela de obrigado (se você criar uma)
    // window.location.href = "obrigado.html";
}
