# DESAFIO DESENVOLVEDOR FRONT-END NEOAPP

## O DESAFIO

A Marvel acaba de te contratar para criar o front-end de sua loja de quadrinhos
virtual. Desejam algo moderno, bonito, e que seus usuários não tenham muito
problema para efetuar a compra. O layout e a arquitetura é com você, seja criativo!
Para eles, o essencial para realizar esta tarefa é:

-   Uma listagem paginada das histórias em quadrinhos (HQ's);
-   Uma página de visualização individual da HQ;
-   E o carrinho
    Depois de negociarem um pouco, pediram algumas coisas que são opcionais na
    entrega do website:
-   Na listagem de HQ's, 10% dos quadrinhos mostrados devem ser marcados
    como raros aleatoriamente ao carregar;
-   O carrinho deve apresentar a possibilidade de inserir um cupom de desconto
    com validação mock, sem API;
-   Por fim, existiriam dois tipos de cupons: os cupons comuns e os raros. Que
    seriam aplicados somente para HQ's respectivamente comuns e raras.

# ETAPAS

## Design

A primeira etapa foi o design do site. Utilizei uma grid responsiva para a listagem das HQs e desenvolvi uma interface simples para a página de visualização individual de cada HQ.

## Conexão com a API

Em seguida, realizei a conexão com a API e conectei os dados às respectivas páginas. Nessa etapa, optei por utilizar Static Site Generation, mas acabei mudando ao final.

## Carrinho de compras

Depois, desenvolvi o carrinho de compras utilizando o redux-toolkit.

## Paginação

Então, desenvolvi o sistema de paginação de HQs.

## Animações

Adicionei algumas animações, destacando a animação que ocorre ao adicionar algum produto ao carrinho.

## Lógica de itens raros e cupons

Em seguida, adicionei a lógica de itens raros aleatórios e cupons raros e comuns.

## Deploy

Quando fui fazer o deploy, percebi que Static Site Generation ia deixar o tempo de build muito rápido, então tive que trocar para Server Side Rendering.

## Cupons de desconto

Utilizei os seguintes cupons para a lógica de cupom:

-   MARVELRARO10: 10% de desconto em HQs raras
-   MARVEL20: 20% de desconto em HQs comuns
