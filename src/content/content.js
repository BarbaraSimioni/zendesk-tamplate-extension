const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function esperarElemento(seletor) {
  return new Promise((resolve) => {
    const existente = document.querySelector(seletor);
    if (existente) return resolve(existente);

    const observador = new MutationObserver(() => {
      const elemento = document.querySelector(seletor);
      if (elemento) {
        observador.disconnect();
        resolve(elemento);
      }
    });
    observador.observe(document.body, { childList: true, subtree: true });
  });
}

function definirValor(input, valor) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype, 'value'
  ).set;
  setter.call(input, valor);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

async function colarHtml(editavel, html, texto) {
  const x = window.scrollX;
  const y = window.scrollY;;

  editavel.focus({ preventScroll: true });
  window.getSelection().selectAllChildren(editavel);
  // O CKEditor só sincroniza a seleção interna no evento "selectionchange",
  // que é assíncrono. Sem esta pausa, ele cola na posição antiga.
  await esperar(100);

  const transferencia = new DataTransfer();
  transferencia.setData('text/html', html);
  transferencia.setData('text/plain', texto);
  editavel.dispatchEvent(
    new ClipboardEvent('paste', {
      clipboardData: transferencia,
      bubbles: true,
      cancelable: true,
    })
  );

  await esperar(10);
  window.scrollTo(x, y);
}

async function carregarModelo(id) {
  const url = chrome.runtime.getURL(`templates/${id}.json`);
  const resposta = await fetch(url);
  return resposta.json();
}

async function carregarModelos() {
  const url = chrome.runtime.getURL('templates/index.json');
  const ids = await (await fetch(url)).json();
  return Promise.all(ids.map(carregarModelo));
}

async function preencher(modelo) {
  const assunto = document.querySelector(SELECTORS.assunto);
  const editor = document.querySelector(SELECTORS.descricao);
  if (!assunto || !editor) {
    console.error('[modelos-pjbank] campos do formulário não encontrados');
    return;
  }
  definirValor(assunto, preencherAutomaticos(modelo.assunto));
  const texto = preencherAutomaticos(modelo.descricao.join('\n'));
  await colarHtml(editor, textoParaHtml(texto), texto);
}

function criarBarra(modelos) {
  const barra = document.createElement('div');
  barra.className = 'mpj-barra';

  const titulo = document.createElement('span');
  titulo.textContent = 'Modelos:';
  barra.append(titulo);

  modelos.forEach((modelo) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.textContent = modelo.nome;
    botao.addEventListener('click', () =>
      preencher(modelo).catch((erro) => console.error('[modelos-pjbank]', erro))
    );
    barra.append(botao);
  });

  return barra;
}

async function main() {
  const [formulario, modelos] = await Promise.all([
    esperarElemento(SELECTORS.formulario),
    carregarModelos(),
  ]);
  if (document.querySelector('.mpj-barra')) return;
  formulario.before(criarBarra(modelos));
}

main().catch((erro) => console.error('[modelos-pjbank]', erro));