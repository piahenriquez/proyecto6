# 📝 API To-Do List

## Descripción

API RESTful para gestionar tareas personales (**To-Do List**).  
Permite a los usuarios registrarse, iniciar sesión y administrar sus tareas.  
Cada usuario solo puede ver, actualizar o eliminar sus propias tareas.

---

## 🚀 Tecnologías usadas

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- cors
- nodemon

---

## ⚙️ Instalación local

1. **Clona el repositorio:**
   ```bash
   git clone <URL>
   cd Proyecto_6
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
     ```
     PORT=3000
     MONGODB_URI=<TU_URI_DE_MONGODB>
     SECRET=<TU_SECRETO_JWT>
     ```

4. **Inicia el servidor:**
   ```bash
   npm run dev
   ```

5. **La API estará disponible en:**  
   [http://localhost:3000](http://localhost:3000)

---

## 📚 Endpoints disponibles

> **Nota:** Para rutas protegidas, incluye el token JWT en el header:  
> `Authorization: Bearer <token>`

### 👤 Usuarios

- **Registrar usuario**
  - `POST /api/v1/users/register`
  - **Body (JSON):**
    ```json
    {
      "username": "usuario",
      "email": "correo@ejemplo.com",
      "password": "contraseña"
    }
    ```

- **Iniciar sesión**
  - `POST /api/v1/users/login`
  - **Body (JSON):**
    ```json
    {
      "email": "correo@ejemplo.com",
      "password": "contraseña"
    }
    ```

- **Verificar token**
  - `GET /api/v1/users/verify`
  - **Headers:**  
    `Authorization: Bearer <token>`

- **Obtener usuario por ID**
  - `GET /api/v1/users/:id`
  - **Headers:**  
    `Authorization: Bearer <token>`

---

### ✅ Tareas

- **Crear tarea**
  - `POST /api/v1/tasks/`
  - **Headers:**  
    `Authorization: Bearer <token>`
  - **Body (JSON):**
    ```json
    {
      "title": "Mi tarea",
      "description": "Descripción opcional"
    }
    ```

- **Obtener todas las tareas**
  - `GET /api/v1/tasks/`
  - **Headers:**  
    `Authorization: Bearer <token>`

- **Obtener tarea por ID**
  - `GET /api/v1/tasks/:id`
  - **Headers:**  
    `Authorization: Bearer <token>`

- **Actualizar tarea**
  - `PUT /api/v1/tasks/:id`
  - **Headers:**  
    `Authorization: Bearer <token>`
  - **Body (JSON):**
    ```json
    {
      "title": "Nuevo título",
      "description": "Nueva descripción",
      "completed": true
    }
    ```

- **Eliminar tarea**
  - `DELETE /api/v1/tasks/:id`
  - **Headers:**  
    `Authorization: Bearer <token>`

---
