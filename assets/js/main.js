document.addEventListener("DOMContentLoaded", function() {
    // Inicializa o Flatpickr no campo de data
    flatpickr("#data-consulta", {
        locale: "pt", // Tradução para português
        dateFormat: "D, d/m/Y", // Formato: seg, 06/07/2026
        minDate: "today", // Bloqueia datas passadas
        disable: [
            function(date) {
                // Bloqueia Sábado (6) e Domingo (0)
                return (date.getDay() === 0 || date.getDay() === 6);
            }
        ]
    });

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
    const dataSelecionada = document.getElementById('data-consulta').value;
    const assunto = document.getElementById('assunto').value || "Não informado";
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');

    // Validação de preenchimento
    if (!nome || !areaSelecionada || !horarioSelecionado || !dataSelecionada) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Montagem da mensagem (dataSelecionada já vem no formato "seg, 06/07/2026" do Flatpickr)
    const mensagem = `Olá, Dra. Taiane! Gostaria de agendar:

Nome: ${nome}
Área: ${areaSelecionada.value}
Data: ${dataSelecionada}
Horário: ${horarioSelecionado.value}h
Assunto: ${assunto}`;

    // Abertura do link do WhatsApp com codificação de caracteres
    const url = `https://wa.me/5521964432126?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}
