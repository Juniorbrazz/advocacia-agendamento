function enviarParaWhatsApp() {
    const nome = document.getElementById('nome').value;
    const dataInput = document.getElementById('data-consulta').value; // Agora lê o novo campo de data
    const assunto = document.getElementById('assunto').value || "Não informado";
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');

    // Validação
    if (!nome || !areaSelecionada || !horarioSelecionado || !dataInput) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Converte a data do formato do navegador (aaaa-mm-dd) para (dd/mm/aaaa)
    const [ano, mes, dia] = dataInput.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // O restante do seu código de montagem da URL continua igual
    const texto = `Olá, Dra. Taiane! Gostaria de agendar:
    
Nome: ${nome}
Área: ${areaSelecionada.value}
Data: ${dataFormatada}
Horário: ${horarioSelecionado.value}h
Assunto: ${assunto}`;

    window.open(`https://wa.me/5521964432126?text=${encodeURIComponent(texto)}`, '_blank');
}
