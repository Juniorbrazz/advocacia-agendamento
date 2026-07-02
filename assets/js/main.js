// === FUNÇÃO DE ENVIO PARA O WHATSAPP (REVISADA) ===
function enviarParaWhatsApp() {
    const nome = document.getElementById('nome').value.trim();
    const dia = document.getElementById('dia').value.trim();
    const mes = document.getElementById('mes').value.trim();
    const ano = document.getElementById('ano-atual').textContent;
    const assunto = document.getElementById('assunto').value.trim() || "Não informado";
    
    // Captura os elementos selecionados
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');

    // Validações individuais e precisas
    if (!nome) {
        alert("Por favor, informe seu nome.");
        return;
    }
    if (!areaSelecionada) {
        alert("Por favor, selecione uma área de atendimento.");
        return;
    }
    if (!horarioSelecionado) {
        alert("Por favor, escolha um horário disponível.");
        return;
    }
    if (!dia || !mes) {
        alert("Data inválida. Verifique o dia e o mês.");
        return;
    }

    // Se passou por tudo, monta a mensagem
    const area = areaSelecionada.value;
    const horario = horarioSelecionado.value;
    const dataFormatada = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${ano}`;
    const numeroEscritorio = "5521964432126"; 

    const textoMensagem = `Olá, Dra. Taiane Freitas! Gostaria de confirmar meu agendamento de consulta presencial.%0A%0A` +
                          `• *Nome do Cliente:* ${nome}%0A` +
                          `• *Área de Atendimento:* ${area}%0A` +
                          `• *Data:* ${dataFormatada}%0A` +
                          `• *Horário:* ${horario}h%0A` +
                          `• *Assunto desejado:* ${assunto}`;
    
    window.open(`https://wa.me/${numeroEscritorio}?text=${textoMensagem}`, '_blank');
}
