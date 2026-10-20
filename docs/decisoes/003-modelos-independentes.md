# 0003 - Modelos independentes, sem blocos compartilhados

- **Status:** Aceita
- **Data:** 2026-10-20

## Contexto

Os quatro modelos (boleto, cartão, conta digital e alteração de conta de repasse) têm partes parecidas, em especial as quatro perguntas sobre produtos, site/redes, estimativa mensal e ticket médio. Mas o texto dessas perguntas **não é idêntico** entre os modelos: a conta digital usa uma versão curta, a alteração de conta traz exemplos ("ex: 500 transações/500 boletos"), e boleto e cartão pedem links ou a forma de prospecção. O princípio adotado é manter o texto literal, igual ao que a equipe já enviava.

## Decisão

Cada modelo é um arquivo JSON completo e independente, com o seu próprio assunto e a sua própria descrição. Trechos que se repetem ficam duplicados entre os arquivos. Não há blocos compartilhados nem herança entre modelos.

## Alternativa descartada

Extrair as perguntas para um bloco comum, reaproveitado pelos modelos. Evitaria repetição, mas, como o texto varia de modelo para modelo, exigiria criar variantes ou exceções por modelo e uma lógica de composição na extensão. Esse custo é maior do que o de manter algumas linhas repetidas.

## Consequências

- **Positivas:** cada modelo se lê de cima a baixo sem precisar consultar outro arquivo, a extensão não precisa de lógica de composição, e alterar um modelo não afeta os demais.
- **Negativas:** mudar uma pergunta que se repete exige editar mais de um arquivo, com risco de esquecer algum e deixar os textos divergentes.

## Gatilho para revisar

Reavaliar esta decisão se a equipe passar a alterar o texto das perguntas com frequência, ou se o número de modelos crescer a ponto de a repetição ficar difícil de manter.