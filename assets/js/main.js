// Define a data mínima como hoje, garantindo que o ano seja sempre o atual
document.addEventListener("DOMContentLoaded", function() {
    // Insere o ano atual automaticamente na interface
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }
});

function enviarParaWhatsApp() {
    const nome = document.getElementById('nome').value;
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano-atual').textContent;
    const assunto = document.getElementById('assunto').value || "Não informado";
    
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');

    if (!nome || !areaSelecionada || !horarioSelecionado || !dia || !mes) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const area = areaSelecionada.value;
    const horario = horarioSelecionado.value;
    const dataFormatada = `${dia}/${mes}/${ano}`;
    const numeroEscritorio = "5521964432126"; 

    const textoMensagem = `Olá, Dra. Taiane Freitas! Gostaria de confirmar meu agendamento de consulta presencial.%0A%0A` +
                          `• *Nome do Cliente:* ${nome}%0A` +
                          `• *Área de Atendimento:* ${area}%0A` +
                          `• *Data:* ${dataFormatada}%0A` +
                          `• *Horário:* ${horario}h%0A` +
                          `• *Assunto desejado:* ${assunto}`;

    window.open(`https://wa.me/${numeroEscritorio}?text=${textoMensagem}`, '_blank');
}
