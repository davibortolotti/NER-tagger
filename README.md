# NER tagger

Este é o repositório oficial da ferramenta de criação de datasets NER através de tagging em texto.. Descritas aqui estão as informações para desenvolvimento e _build_ da aplicação web do protótipo do projeto, estruturas de pastas, informações, etc.

## 1. Arquitetura

### 1.1 NER tagger

Aplicação construída em react, em cima de um fork do projeto React Taggy.

### 1.2 Backend

- Desenvolvimento em Express, framework construído em Node.js.
- Banco de dados MongoDB

## 2. Estrutura de pastas

    Ner-tagger
        └───src: Conteúdo react
    		└───components: Componentes próprios em React.
        	└───react-taggy: fork do react-taggy com algumas modificações para atender ao projeto
        └───backend: conteúdo Express
            └───controllers: Controllers da aplicação, com as rotas das APIs.
            └───schemas: Schemas de validação de json.
            └───store: Parte da arquitetura responsável pela manipulação de documentos no banco de dados.

## 3. Build do projeto

### 3.1 Requisitos

Para utilizar a aplicação, é necessário ter os seguintes recursos instalados:

- node
- npm
- mongoDB (ou um docker do mesmo)

### 3.2 Instalando as dependências

Execute o comando `npm install` na pasta raiz, e depois o comando `npm install` na pasta `backend` para download de ambas as dependências.
