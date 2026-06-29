function enviarParaWhatsApp() {
    // 1. Captura os elementos do formulário preenchidos pelo cliente
    const nome = document.getElementById('nome').value;
    const assunto = document.getElementById('assunto').value || "Não informado";
    const dataInput = document.getElementById('data-consulta').value;
    
    // 2. Captura a Área de Atuação escolhida
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const area = areaSelecionada ? areaSelecionada.value : "Não informada";

    // 3. Captura o Horário escolhido na grade
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');
    const horario = horarioSelecionado ? horarioSelecionado.value : "Não informado";

    // 4. Formata a data de AAAA-MM-DD para o padrão DD/MM/AAAA
    let dataFormatada = "Não informada";
    if (dataInput) {
        const [ano, mes, dia] = dataInput.split('-');
        dataFormatada = `${dia}/${mes}/${ano}`;
    }

    // 5. Configuração do número do escritório (Substitua pelo número real da Dra. Taiane)
    // ATENÇÃO: Coloque apenas números, começando com o 55 e o DDD. Ex: 5521999999999
    const numeroEscritorio = "5521999999999"; 

    // 6. Monta a mensagem perfeitamente formatada e profissional
    const textoMensagem = `Olá, Dra. Taiane Freitas! Gostaria de confirmar meu agendamento de consulta presencial.%0A%0A` +
                          `• *Nome do Cliente:* ${nome}%0A` +
                          `• *Área de Atendimento:* ${area}%0A` +
                          `• *Data:* ${dataFormatada}%0A` +
                          `• *Horário:* ${horario}h%0A` +
                          `• *Assunto desejado:* ${assunto}`;

    // 7. Cria a URL da API do WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroEscritorio}?text=${textoMensagem}`;
    
    // 8. Abre o WhatsApp do cliente em uma nova aba com a mensagem pronta para enviar
    window.open(urlWhatsApp, '_blank');
}
