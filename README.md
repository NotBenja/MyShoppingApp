# MyShoppingApp
El proyecto FullStack MyShoppingApp ofrece una aplicación que permite realizar consultas CRUD sobre diferentes tablas de una tienda mediante una interfaz de usuario. Este proyecto fue diseñado con una arquitectura moderna y tecnologías actuales para proporcionar una experiencia rápida y eficiente.

## Tecnologías/Herramientas utilizadas

### Backend:
- **Lenguajes y Frameworks**:
  - JavaScript
  - Node.js
  - Express.js
  - MySQL

- **Herramientas**:
  - Docker

### Frontend:
- **Lenguajes y Frameworks**:
  - JavaScript
  - React.js
  - Tailwind CSS

- **Herramientas**:
  - Thunder Client

## Arquitectura de la App
La aplicación sigue una arquitectura basada en servicios, donde el frontend y el backend están desacoplados para facilitar la escalabilidad y el mantenimiento.

- **Backend**: API RESTful dockerizada que gestiona las operaciones CRUD sobre las tablas de productos, ventas e inventario.
- **Frontend**: Interfaz responsiva que consume la API para interactuar con el usuario.
- **Base de datos**: Base de datos hosteada en MySQL soportada por un contenedor Docker. Puedes visualizar el diagrama Entidad-Relación [aquí](./docs/MyShoppingAppER.pdf).
## Para ejecutar el proyecto

1. Clona el repositorio:
```shell
git clone https://github.com/NotBenja/MyShoppingApp.git
cd OpAI_Shop
```

2. Abre una terminal desde el directorio del repositorio y ejecuta:
```shell
cd server
docker compose up --build
```
3. (Recomendado) Comprueba que el servidor de Backend está corriendo en http://localhost:4000 .

4. Abre otra terminal en paralelo y ejecuta:
```shell
cd client
npm install 
npm run dev
```
5. Deja las terminales ejecutando dichos procesos y luego utiliza tu navegador de preferencia e ingresa a http://localhost:5173 para acceder a la aplicación.

¡Con estas instrucciones el proyecto funcionará!



