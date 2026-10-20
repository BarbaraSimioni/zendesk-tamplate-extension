# 0001 - Modelos em JSON dentro do repositório

- **Status:** Aceita
- **Data:** 2026-10-16

## Contexto

A equipe de suporte abre solicitações repetitivas no Zendesk do PJBank (validação de credencial de boleto e de cartão, validação de conta digital, alteração de conta de recebimento). Hoje cada pessoa copia uma solicitação antiga e edita o texto. Os modelos precisam ser os mesmos para toda a equipe e fáceis de revisar quando mudarem.

## Decisão

Os modelos ficam como arquivos JSON na pasta `templates/` do repositório, um arquivo por tipo de solicitação. A extensão os carrega com `fetch` a partir de `chrome.runtime.getURL`, o que exige declará-los em `web_accessible_resources` no `manifest.json`.

## Alternativas descartadas

- **`chrome.storage.sync`:** permite editar pela interface, mas cada pessoa passa a ter a sua própria versão, e os textos divergem com o tempo.
- **JSON em uma URL interna buscado em tempo de execução:** atualiza sem reinstalar, mas exige hospedagem e adiciona uma dependência de rede e de permissões que o MVP não precisa.

## Consequências

- **Positivas:** histórico e revisão pelo Git, todos usam o mesmo texto, nenhuma permissão extra no manifest, quem mantém os textos mexe só em `templates/`.
- **Negativas:** alterar um modelo exige novo release e recarregar a extensão em cada máquina. Se a equipe pedir edição pela interface, esta decisão deve ser revista.