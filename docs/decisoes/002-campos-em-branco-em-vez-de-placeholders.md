# 0002 - Campos em branco em vez de placeholders `{{...}}`

- **Status:** Aceita
- **Data:** 2026-10-19

## Contexto

No desenho inicial, os modelos traziam placeholders nomeados (`{{cnpj}}`, `{{chamado}}`, `{{empresa}}`) nos pontos a preencher. Nos testes, percebi que precisaria apagar cada placeholder à mão antes de digitar o valor real, o que atrapalha o uso do dia a dia.

## Decisão

Os modelos passam a ter os campos em branco, no formato do texto que o suporte já conhece (por exemplo `CNPJ: ` e `R$ `). O Assunto traz os rótulos legíveis `(Responsavel) - VALIDAR CREDENCIAL BOLETO - N° Chamado - Empresa`. Apenas a saudação continua automática e é resolvida pela extensão conforme o horário.

## Alternativa descartada

Manter `{{placeholders}}` nomeados para todos os campos manuais. Tinha a vantagem de deixar visível o que faltava preencher e de permitir validar a lista de campos por teste automático, mas obrigava a apagar o marcador antes de digitar.

## Risco aceito

Esquecer um campo passa a ser silencioso: um campo em branco não chama atenção, e a solicitação pode ser enviada incompleta, só sendo notada pela equipe do PJBank. As perguntas 1 a 4 também ficam sem linha de resposta pronta.

## Mitigação prevista

Na Fase 2, a extensão deve posicionar o cursor no primeiro campo em branco e destacar os campos ainda vazios antes do envio. Com isso, o risco some sem voltar aos placeholders.