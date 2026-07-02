function enviarParaWhatsApp() {
    const nome = document.getElementById('nome').value.trim();
    const dia = document.getElementById('dia').value.trim();
    const mes = document.getElementById('mes').value.trim();
    const ano = document.getElementById('ano-atual').textContent;
    const assunto = document.getElementById('assunto').value.trim() || "Não informado";
    
    // Captura os valores de forma mais segura
    const areaInput = document.querySelector('input[name="area"]:checked');
    const horarioInput = document.querySelector('input[name="horario"]:checked');

    // Validação específica (mensagens individuais)
    if (!nome) { alert("Por favor, digite seu nome."); return; }
    if (!areaInput) { alert("Por favor, selecione uma área de atendimento."); return; }
    if (!horarioInput) { alert("Por favor, selecione um horário."); return; }
    if (!dia || !mes) { alert("Por favor, preencha a data."); return; }

    const area = areaInput.value;
    const horario = horarioInput.value;
    
    // Montagem da URL
    const dataFormatada = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;
    const numeroEscritorio = "5521964432126"; 

    const textoMensagem = `Olá, Dra. Taiane Freitas! Gostaria de confirmar meu agendamento.%0A%0A` +
                          `• *Nome:* ${nome}%0A` +
                          `• *Área:* ${area}%0A` +
                          `• *Data:* ${dataFormatada}%0A` +
                          `• *Horário:* ${horario}h%0A` +
                          `• *Assunto:* ${assunto}`;
    
    window.open(`https://wa.me/${numeroEscritorio}?text=${textoMensagem}`, '_blank');
}
