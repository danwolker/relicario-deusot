# 📜 Relicário – Frontend Estático (DeusOT)

Este projeto é um **frontend estático** desenvolvido com **HTML, CSS e JavaScript (ES Modules)**, inspirado no site do servidor **DeusOT**.  
Não há backend, build tool, bundler ou framework — toda a navegação é feita via **router em JavaScript**, renderizando páginas dinamicamente dentro do container `<div id="app">`.

---

## 🧱 Tecnologias usadas

- HTML5 semântico
- CSS moderno (responsivo)
- JavaScript ES Modules
- Router próprio em JS (SPA-like)
- Eventos customizados (`emit / on`)
- Componentes HTML injetados dinamicamente
- Nenhum backend / nenhuma API

---

## 📁 Estrutura básica do projeto

```text
assets/
├── css/
│   ├── base/
│   └── pages/
│       └── vip-system.css
├── js/
│   ├── components/
│   │   └── sidebar.js
│   ├── pages/
│   │   ├── router.js
│   │   ├── home.js
│   │   ├── vip-system.js
│   │   └── loyalty.js
│   └── utils.js
components/
│   └── sidebar.html
index.html
README.md


start serve = npx http-server .