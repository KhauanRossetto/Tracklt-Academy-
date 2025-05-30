# 📘 TrackIt Academy

**TrackIt Academy** é uma aplicação web para **acompanhamento de hábitos diários**, permitindo que usuários registrem, visualizem e marquem hábitos como concluídos. Desenvolvido com React e Vite, o projeto faz consumo de uma API para autenticação, cadastro e controle dos hábitos.

## 🔗 Link de Deploy

Acesse o projeto funcionando aqui: [TrackIt Academy - Deploy](https://trackit-academy.vercel.app)

## ✨ Funcionalidades

- Cadastro e login de usuário
- Criação de hábitos diários
- Marcação de hábitos concluídos
- Visualização dos hábitos do dia atual
- Histórico de hábitos

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Styled Components](https://styled-components.com/)
- Context API

## 📂 Estrutura de Pastas

```bash
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/          # Ícones e imagens
│   ├── components/      # Componentes reutilizáveis (Menu, Topo etc)
│   ├── contexts/        # Contexto de autenticação
│   ├── pages/           # Páginas principais (Login, Cadastro, Hoje, etc)
│   ├── services/        # Comunicação com API (auth, hábitos)
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Ponto de entrada da aplicação
