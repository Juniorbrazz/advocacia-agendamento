document.addEventListener("DOMContentLoaded", function() {
    const elementoAno = document.getElementById('ano-atual');
    if (elementoAno) elementoAno.textContent = new Date().getFullYear();

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
    const dia = document.getElementById('dia').value.padStart(2, '0');
    const mes = document.getElementById('mes').value.padStart(2, '0');
    const ano = document.getElementById('ano-atual').textContent;
    const assunto = document.getElementById('assunto').value || "Não informado";
    const areaSelecionada = document.querySelector('input[name="area"]:checked');
    const horarioSelecionado = document.querySelector('input[name="horario"]:checked');

    if (!nome || !areaSelecionada || !horarioSelecionado || !dia || !mes) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const texto = `Olá, Dra. Taiane! Gostaria de agendar: %0A%0A` +
                  `Nome: ${nome}%0A` +
                  `Área: ${areaSelecionada.value}%0A` +
                  `Data: ${dia}/${mes}/${ano}%0A` +
                  `Horário: ${horarioSelecionado.value}h%0A` +
                  `Assunto: ${assunto}`;
    
    window.open(`https://wa.me/5521964432126?text=${texto}`, '_blank');
}
