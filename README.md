# Serviço de FILMES para Aplicação CINEMAGIC

## Tecnologias
- Node.js
- TypeScript
- Fastify
- Prisma
- SQLite
- Mermaid.js

## Para execução ou edição como desenvolverdor (instalação das dependências)

-Instalação NODE (v18.12.0 ou superior recomendada)

-Instalação TypeScript (dev)
comando: npm i typescript -D

-Instalação Fastify (dep de produção)
comando: npm i fastify

-Pacote de conversão automática de TS para JS (dev)
comando: npm i tsx -D

-Intalação do Prisma e Prisma Client (dev e prod)
comando: npm i prisma -D
comando: npm i @prisma/client

-Para utilização de Migrations (sempre que houver edição no banco de dados)
comando: npx prisma migrate dev

-Instalação de dep para geração de ERD (dev)
comando: npm i prisma-erd-generator @mermaid-js/mermaid-cli -D

-Para gerar ERD (sempre que houver edição no banco de dados)
comando: npx prisma generate

-Intalação de biblioteca Cors (biblioteca para segurança)
comando: npm i @fastify/cors

-Para visualização do Banco de dados via web
comando: npx prisma studio

-Para rodar a seed de população do banco de dados (preencher o arquivo seed.ts antes de executar)
comando: npx prisma db seed

-Intalação do Zod
comando: npm i zod

## Não obrigatório e recomendado (config)

No arquivo settings.json (VSCode) - Para formatação automática ao salvar e autocomplete das funções do Prisma

"[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma",
    "editor.formatOnSave": true
}

