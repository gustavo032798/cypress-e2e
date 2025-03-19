# Testes End-to-End com Cypress

Projeto de exemplo para demonstrar testes end-to-end (e2e) escritos com Cypress rodando no GitHub Actions.

## Pré-requisitos

Para clonar e rodar este projeto, você precisará de:
- git (Versão utilizada: 2.34.1)
- Node.js (Versão utilizada: v18.15.0)
- npm (Versão utilizada: 9.5.0)
**Nota:** Ao instalar o Node.js, o npm é instalado automaticamente. 🚀

## Instalação

Para instalar as dependências de desenvolvimento, execute o comando:
`npm install` Ou, de forma abreviada `npm i`

## Configurando as Variáveis de Ambiente

Antes de executar os testes, é necessário configurar algumas variáveis de ambiente.

Faça uma cópia do arquivo cypress.env.example.json e renomeie para cypress.env.json. Em seguida, defina os valores apropriados para todas as variáveis.

Os valores que são passados como variaveis de ambiente é do servidor de Emails "mailosaur", onde faz a verificação de recebimento de emails para preencher nos testes.

Nota: O arquivo cypress.env.json não é rastreado pelo git, pois está listado no arquivo .gitignore.

## Executando os Testes

Neste projeto, é possível executar os testes nos modos interativo e headless, tanto em viewports de desktop quanto de tablet.

### Modo Headless (Sem Interface Gráfica)

Para executar todos os testes no modo headless usando uma viewport de desktop, rode o comando:
`npm test`

Ou de forma abreviada:
`npm t`

Para executar os testes apropriados no modo headless usando uma viewport de tablet, rode o comando:
`npm run test:tablet`

### Modo Interativo

Para abrir o Cypress App e executar os testes em modo interativo usando uma viewport de desktop, rode o comando:
`npm run cy:open`

Para abrir o Cypress App e executar os testes em modo interativo usando uma viewport de tablet, rode o comando:
`npm run cy:open:tablet`

## Integração com GitHub Actions

Este projeto está configurado para ser executado automaticamente no GitHub Actions sempre que houver um push ou pull request na branch principal.
Certifique-se de que o arquivo cypress.env.json esteja devidamente configurado antes de rodar os testes na pipeline.

Feito por Gustavo Carrança.