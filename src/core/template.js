function saudacao(data = new Date()) {
  const hora = data.getHours();
  if (hora < 12) return 'Bom dia';
  if (hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

function preencherAutomaticos(texto, data = new Date()) {
  const automaticos = { saudacao: saudacao(data) };

  return texto.replace(/\{\{(\w+)\}\}/g, (original, nome) =>
    Object.hasOwn(automaticos, nome) ? automaticos[nome] : original
  );
}

function escaparHtml(texto) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function textoParaHtml(texto) {
  return texto
    .split(/\n{2,}/)
    .map((bloco) => {
      const html = escaparHtml(bloco)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
      return `<p>${html}</p>`;
    })
    .join('');
}