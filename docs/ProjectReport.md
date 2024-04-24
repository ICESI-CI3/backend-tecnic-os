## Informe Detallado: API para Gestión de Usuarios, Técnicos y Citas


### 1. Descripción General del Proyecto
El proyecto es una API para una aplicación que conecta a usuarios con técnicos para proporcionar servicios como reparaciones, limpieza, electricidad, entre otros. La aplicación permite a los usuarios registrarse, iniciar sesión, solicitar servicios, agendar citas y gestionar sus perfiles. Los técnicos pueden gestionar sus servicios, recibir solicitudes y mantener sus horarios. La API está desarrollada con NestJS y utiliza PostgreSQL como base de datos.

### 2. Autenticación y Autorización
La autenticación se basa en tokens JWT (JSON Web Tokens). Los tokens se generan y validan para controlar el acceso a los endpoints protegidos. Aquí están las partes clave de la autenticación y autorización:

#### 2.1. Autenticación con JWT
Los tokens JWT se usan para autenticar a los usuarios. Al iniciar sesión, el servidor genera un token JWT que se devuelve al cliente y debe ser incluido en las solicitudes subsecuentes para endpoints protegidos. El token contiene información como el ID del usuario, el tiempo de expiración y la firma para validar su autenticidad.

- **Implementación**: Se usa el módulo `JwtModule` de NestJS para gestionar la creación y validación de tokens JWT. El secreto para firmar los tokens se configura en variables de entorno para mayor seguridad.

- **Uso de Guardias**: El `AuthGuard` verifica si el token está presente y es válido. Se incluye en los endpoints protegidos para asegurar que solo los usuarios autenticados puedan acceder a ellos.

#### 2.2. Autorización por Roles
La autorización se basa en roles, como `technician`, `superUser`, y `user`. Se utilizan guardias y decoradores para restringir el acceso según el rol del usuario.

- **Implementación**: Se usa el `RoleProtected` decorador para especificar qué roles pueden acceder a un endpoint determinado. El `UserRoleGuard` verifica el rol del usuario autenticado para autorizar o denegar el acceso.

- **Ejemplo**: El endpoint para crear citas (`POST /appointment/create`) está protegido por el `AuthGuard` y el `UserRoleGuard`, y solo permite el acceso a usuarios con el rol `technician` o `superUser`.

### 3. Funcionalidades de la API 
### (TODAS LAS RUTAS EMPIEZAN POR https://backend-tecnic-os.onrender.com/api/)
La API proporciona funcionalidades para gestionar usuarios, técnicos y citas. Se utilizan decoradores de NestJS para definir los controladores y gestionar las rutas. Los servicios se encargan de la lógica empresarial y las operaciones de base de datos.

#### 3.1. Módulo de Usuarios
El módulo de Usuarios permite gestionar operaciones relacionadas con usuarios, como crear, actualizar, obtener y eliminar usuarios.

- **Crear Usuario**
  - **Endpoint**: `POST /users`
  - **Descripción**: Crea un nuevo usuario.
  - **Parámetros**:
    - `CreateUserDto`: ID, email, contraseña, nombre, rol.
  - **Respuesta**: Usuario recién creado.

- **Obtener Todos los Usuarios**
  - **Endpoint**: `GET /users`
  - **Descripción**: Devuelve la lista de todos los usuarios.
  - **Respuesta**: Una lista de usuarios.

- **Obtener Usuario por ID**
  - **Endpoint**: `GET /users/:id`
  - **Descripción**: Devuelve el usuario correspondiente al ID especificado.
  - **Respuesta**: El usuario correspondiente.

- **Actualizar Usuario**
  - **Endpoint**: `PATCH /users/:id`
  - **Descripción**: Actualiza la información del usuario especificado por el ID.
  - **Respuesta**: Usuario actualizado.

- **Eliminar Usuario**
  - **Endpoint**: `DELETE /users/:id`
  - **Descripción**: Elimina el usuario correspondiente al ID especificado.
  - **Respuesta**: Confirmación de eliminación.

#### 3.2. Módulo de Autenticación
El módulo de Autenticación gestiona el registro, inicio de sesión y autenticación de usuarios.

- **Registrar Usuario**
  - **Endpoint**: `POST /auth/register`
  - **Descripción**: Registra un nuevo usuario y devuelve un token JWT.
  - **Parámetros**:
    - `RegisterDto`: ID, nombre, email, contraseña, rol.
  - **Respuesta**: Usuario recién registrado y token JWT.

- **Iniciar Sesión**
  - **Endpoint**: `POST /auth/login`
  - **Descripción**: Permite a un usuario iniciar sesión y recibe un token JWT.
  - **Parámetros**:
    - `LoginDto`: ID, contraseña.
  - **Respuesta**: Token JWT y datos del usuario.

- **Perfil del Usuario**
  - **Endpoint**: `GET /auth/profile`
  - **Descripción**: Devuelve información del usuario autenticado.
  - **Respuesta**: Datos del perfil del usuario autenticado.

#### 3.3. Módulo de Técnicos
El módulo de Técnicos gestiona la creación y actualización de técnicos.

- **Registrar Técnico**
  - **Endpoint**: `POST /technicians/register`
  - **Descripción**: Registra un nuevo técnico.
  - **Parámetros**:
    - `CreateTechnicianDto`: Descripción, tags, ID del usuario.
  - **Respuesta**: Técnico recién registrado.

- **Obtener Todos los Técnicos**
  - **Endpoint**: `GET /technicians`
  - **Descripción**: Devuelve la lista de todos los técnicos.
  - **Respuesta**: Lista de técnicos.

- **Obtener Técnico por ID de Usuario**
  - **Endpoint**: `GET /technicians/:userId`
  - **Descripción**: Devuelve el técnico asociado al ID del usuario.
  - **Respuesta**: El técnico correspondiente.

- **Actualizar Técnico**
  - **Endpoint**: `PATCH /technicians/:userId`
  - **Descripción**: Actualiza la información del técnico correspondiente al ID del usuario.
  - **Respuesta**: Técnico actualizado.

- **Eliminar Técnico**
  - **Endpoint**: `DELETE /technicians/:id`
  - **Descripción**: Elimina el técnico correspondiente al ID.
  - **Respuesta**: Confirmación de eliminación.

#### 3.4. Módulo de Citas
El módulo de Citas gestiona la creación, actualización y eliminación de citas entre técnicos y usuarios.

- **Crear Cita**
  - **Endpoint**: `POST /appointment/create`
  - **Descripción**: Crea una nueva cita entre un usuario y un técnico.
  - **Parámetros**:
    - `CreateAppointmentDto`: Descripción, ID del usuario, fecha, hora de inicio.
  - **Respuesta**: Cita creada.

- **Obtener Todas las Citas**
  - **Endpoint**: `GET /appointment`
  - **Descripción**: Devuelve la lista de todas las citas.
  - **Parámetros**:
    - `updateAppointmentDto`: Descripción, fecha, hora de inicio.
  - **Respuesta**: cita actualizada

- **Obtener Cita por ID**
  - **Endpoint**: `GET /appointment/:id`
  - **Descripción**: Devuelve la cita correspondiente al ID especificado.
  - **Respuesta**: Cita correspondiente al ID.

- **Actualizar Cita**
  - **Endpoint**: `PATCH /appointment/:id`
  - **Descripción**: Actualiza la cita correspondiente al ID especificado.
  - **Respuesta**: Cita actualizada.

- **Eliminar Cita**
  - **Endpoint**: `DELETE /appointment/:id`
  - **Descripción**: Elimina la cita correspondiente al ID especificado.
  - **Respuesta**: Confirmación de eliminación.

### 4. Persistencia de Datos
La persistencia de datos se logra mediante el uso de PostgreSQL como base de datos. El back-end y la base de datos están desplegados en el mismo servidor, pero en despliegues separados. Para la integración con PostgreSQL, se utiliza el módulo `TypeOrmModule` de NestJS, permitiendo el uso de repositorios para operaciones CRUD en las entidades.

Los repositorios se inyectan en los servicios para realizar operaciones de lectura y escritura en la base de datos. Se usan migraciones para gestionar cambios en la estructura de la base de datos, y las conexiones se configuran en el archivo `typeorm.config.ts`, que contiene detalles como el tipo de base de datos, host, puerto, nombre de la base de datos, nombre de usuario y contraseña. Sin embargo, por seguridad y para no exponer esta información en el repositorio de github, estos datos son referenciados al `.env`.

