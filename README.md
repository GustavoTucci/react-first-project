# Gerenciador de Gastos

Aplicação web responsiva para controle financeiro pessoal, desenvolvida em React. Permite registrar receitas e despesas, acompanhar o saldo e analisar os gastos por categoria.

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</div>

## Descrição

Este projeto foi criado como uma aplicação prática para aprender e aplicar conceitos fundamentais de desenvolvimento frontend, como:

- gerenciamento de estado em React
- manipulação de formulários
- cálculos financeiros em tempo real
- filtros combinados por mês, categoria e tipo
- visualização gráfica dos gastos
- estrutura de componentes
- estilização com CSS

## Funcionalidades

- cadastro de receitas e despesas
- cálculo automático de saldo
- resumo de entradas e saídas
- agrupamento por categoria
- gráfico de despesas por categoria
- histórico de movimentações com data
- remoção de itens do histórico
- filtros por mês, categoria e tipo
- botão para limpar todos os filtros
- layout responsivo para desktop e mobile

Ao iniciar, a aplicação carrega transações de demonstração para que o dashboard, o histórico e o gráfico possam ser explorados imediatamente. Novas movimentações são adicionadas ao histórico durante a sessão.

## Tecnologias Utilizadas

- React
- JavaScript
- CSS
- Create React App

## Requisitos

Antes de iniciar, verifique se você possui:

- Node.js instalado
- npm instalado

## Executando a Aplicação

Para iniciar o projeto em modo de desenvolvimento:

```bash
npm start
```

A aplicação será aberta em:

```text
http://localhost:3001
```

> A porta 3001 foi escolhida para evitar conflitos com outras aplicações que já usam a porta 3000.

## Estrutura do Projeto

```text
primeiro-projeto/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
├── .gitignore
├── package-lock.json
└── node_modules/
```

## Scripts Disponíveis

```bash
npm start
```
Inicia a aplicação em modo de desenvolvimento.

```bash
npm run build
```
Cria a versão de produção para deploy.

```bash
npm test
```
Executa os testes do projeto.

## Como Usar

1. Preencha a descrição da movimentação.
2. Escolha a categoria correspondente.
3. Selecione o tipo da operação: receita ou despesa.
4. Informe o valor e a data.
5. Clique em salvar.
6. A interface atualiza automaticamente os totais, o gráfico e o histórico.
7. Use os filtros no histórico para selecionar um mês, uma categoria ou o tipo de movimentação.
8. Clique em “Limpar filtros” para voltar a visualizar todos os registros.

## Melhorias Planejadas

- integração com backend em Node.js
- persistência em banco de dados
- autenticação de usuário
- gráficos de despesas por período
- exportação dos dados em CSV
- edição de movimentações existentes
- despesas recorrentes e parceladas
- metas de economia e limites por categoria

## Status do Projeto

Em desenvolvimento, com as funcionalidades essenciais de registro, análise e filtragem de movimentações já disponíveis.

## Autor

Projeto desenvolvido como estudo prático de React e fundamentos de aplicações web.

