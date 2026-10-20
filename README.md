# Modelos de Solicitação PJBank

Extensão para Chrome/Edge que preenche o **assunto** e a **descrição** das solicitações do suporte PJBank (Zendesk) a partir de modelos, para que a equipe só precise completar os dados.

## O que faz

Na página de nova solicitação, a extensão mostra uma barra **Modelos** acima do formulário. Ao clicar em um modelo, ela preenche o Assunto e a Descrição com a estrutura padrão, e a saudação (Bom dia / Boa tarde / Boa noite) é calculada pelo horário.

Modelos disponíveis:

- Validação de credencial de boleto
- Validação de credencial de cartão
- Adesão de conta digital
- Alteração de conta de repasse

A extensão **não envia** a solicitação e **não guarda dados**: ela só escreve texto nos campos. Os campos CPF/CNPJ e Sistema de Gestão continuam sendo preenchidos manualmente.

## Instalação (modo desenvolvedor)

1. Baixe ou clone este repositório.
2. Abra `chrome://extensions` (ou `edge://extensions`).
3. Ative o **Modo do desenvolvedor**.
4. Clique em **Carregar sem compactação** e selecione a pasta raiz do projeto.
5. Abra `https://pjbank.zendesk.com/hc/pt-br/requests/new`. A barra de modelos deve aparecer.

Depois de alterar qualquer arquivo, clique no ícone de recarregar do card da extensão e atualize a página (F5).

## Como usar

1. Clique no modelo desejado.
2. Preencha à mão os campos em branco (responsável, chamado, empresa, CNPJ etc.).
3. Revise antes de enviar.

Atenção: clicar em um modelo **substitui** o conteúdo atual do Assunto e da Descrição.

## Como adicionar ou alterar um modelo

Os modelos ficam em `templates/`, um arquivo JSON por tipo:

```json
{
  "id": "validacao-boleto",
  "nome": "Validação de credencial de boleto",
  "assunto": "(Responsavel) - VALIDAR CREDENCIAL BOLETO - N° Chamado - Empresa",
  "descricao": [
    "{{saudacao}}, tudo bem?",
    "",
    "CNPJ: "
  ]
}
```

- `descricao` é uma lista de linhas. Linha vazia separa parágrafos, e linhas seguidas ficam juntas.
- `{{saudacao}}` é o único placeholder automático.
- `**texto**` vira negrito.
- Para um modelo novo, crie o JSON e acrescente o id em `templates/index.json`. A ordem do arquivo é a ordem dos botões.

## Estrutura do projeto

├── manifest.json # configuração da extensão (Manifest V3)
├── templates/ # modelos em JSON + index.json
├── src/
│ ├── config/selectors.js # seletores do formulário (único lugar a ajustar se o Zendesk mudar)
│ ├── core/template.js # lógica pura: saudação e conversão de texto em HTML
│ └── content/ # script e estilo injetados na página
└── docs/decisoes/ # registros de decisões de arquitetura (ADRs)


## Decisões de arquitetura

- [0001 - Modelos em JSON dentro do repositório](docs/decisoes/0001-modelos-em-json-no-repositorio.md)
- [0002 - Campos em branco em vez de placeholders](docs/decisoes/0002-campos-em-branco-em-vez-de-placeholders.md)
- [003 - Modelos Independentes, sem blocos compartilhados](docs/decisoes/003-modelos-independentes.md)

## Limitações conhecidas

- Funciona só na página de nova solicitação do Zendesk do PJBank.
- Depende da estrutura do formulário. Se o Zendesk mudar, ajuste `src/config/selectors.js`.
- Esquecer um campo em branco não gera aviso.
- Permissões: nenhuma além de rodar nessa página.

## Roadmap

- [ ] Preencher o responsável automaticamente (configuração por usuário)
- [ ] Preencher "Sistema de Gestão" com ERP Externo
- [ ] Pedir confirmação antes de sobrescrever conteúdo
- [ ] Destacar campos em branco
- [ ] Testes automatizados, ESLint e CI

## Versão

`0.1.0` (MVP). O versionamento segue [SemVer](https://semver.org/lang/pt-BR/).