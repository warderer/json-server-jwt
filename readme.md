# Mock de API con Autenticación usando JWT

El objetivo es crear un mock de una API Rest de eCommerce que haga uso de autenticación con JWT y cuente con algunas rutas protegidas.

Para usarlo:
1) Haz git clone del repositorio: `git clone https://github.com/warderer/json-server-jwt.git`
2) Desde la terminal, recuerda entrar a la carpeta del proyecto: `cd json-server-jwt`
3) Instala las dependencias con el comando: `npm install`
4) Ejecuta el servidor con el comando: `npm run start`

## Despliegue en Render (opcional)
Si lo deseas puedes hacer deployment de este repositorio en tu cuenta de Render:
1) Crea una cuenta en [Render](https://render.com/) e inicia sesión.
2) Una vez iniciada la sesión, ve a la página de "Dashboard", y luego ubica el apartado de "Web Services" y haz click en el botón "New Web Service".
3) En la siguiente pantalla de "Create a New Service", utiliza la segunda opción "Public Web Repository", coloca en la casilla la url del repo de github (https://github.com/warderer/json-server-jwt) y haz click en el botón "Continue".
4) En la siguiente pantalla de "You are deploying a web service for warderer/json-server-jwt" deberás rellenar la siguiente información:
   - **Name:** Nombre del proyecto, sin espacios ni carácteres especiales. Debe ser único ya que la url se generará a partir de esto.
   - **Region:** Ubicación físical del servidor. Elije el más cercano a tu ubicación o deja el valor por defecto.
   - **Branch:** Debe estar en main.
   - **Runtime:** Elige Node.
   - **Build Command:** Escribe: npm install
   - **Start Command:** Escribe: npm run start
   - **Instance Type:** Deja la opción por defecto de "Free" (Gratis).
5) Finalmente haz click en el botón de Create Web Service al final de la página y a esperar que se haga el deployment.
6) Una vez terminado el deployment, podrás ver la URL para acceder a tu API en la esquina superior izquierda de la pantalla de la página de Render.

**Nota: Recuerda que en el plan gratuito de Render, si el servidor pasa mucho tiempo en inactividad se "dormirá" por lo que cuando hagas una primera petición este puede tardar un poco en contestar por que esta "levantandose", después de esto responderá normal mientras siga en uso (permanezca despierto).**

## Endpoints
Por defecto el servidor se ejecuta en: http://localhost:3000

Donde existen las rutas de `items` y de `users`

### users

#### Register
`POST`
`/register`

```
{
  "first_name": "Dr.",
  "last_name": "Strange",
  "gender": "M",
  "email": "drstrange@marvel.com",
  "password": "multiverso",
  "role": "CUSTOMER"
}
```
Al crearse un registro, automaticamente la API creará los campos `id`, `createdAt` y `updatedAt`.
Si no se especifica un `role`, como por ejemplo `ADMIN`, entonces por defecto será `CUSTOMER`.
El correo es único, si se repite devolverá error al intentar registrar uno ya creado anteriormente.

#### Login
`POST`
`/login`
```
{
  "email": "drstrange@marvel.com",
  "password": "multiverso"
}
```
Al iniciar sesión se devolvera un JWT que contiene, entre otras cosas el `id` y `role` del usuario en el payload.

#### getAllUsers
`GET`
`/users`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

Solo un usuario de `type: "ADMIN"` puede visualizar el listado de usuarios.

#### getOneUser
`GET`
`/users/:id`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

Solo un usuario de `type: "ADMIN"` puede visualizar el detalle de un usuario por id.

#### me
`GET`
`/users/me`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

Devolverá la información del usuario actual de acuerdo al Token proporcionado.

### items

#### createItem
`POST`
`/items`

`headers: AUTHORIZATION`
`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFjMzExNTUxLTA3NGEtNDIyNi05NzU4LWYwNzgwYzQyNzYxMiIsInJvbGUiOiJDVVNUT01FUiIsImlhdCI6MTY3NDk2MDMxNH0.5Ee8qu7YYcv0Egc2MOj8PQKMA0QHEf3shn0gnZuR-iA`

```
{
    "product_name": "Awesome Granite Bacon",
    "description": "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    "price": 962,
    "category": "Kids",
    "brand": "Osinski - Prosacco",
    "sku": "e9cbfac1-301a-42c3-b94a-711a39dc7ed1",
    "image": "https://i.pinimg.com/originals/eb/83/be/eb83be580847bcdc4c8f403c8085d3c8.jpg"
}
```
Debe haberse iniciado sesión y enviar el token en la cabecera de la petición para que pueda ser creado un producto.

#### getAllItems
`GET`
`/items`
Lista todos los Items.

#### GetOneItem
`GET`
`/items/:id`
Devuelve un solo item de acuerdo al id proporcionado.

## Usuarios de prueba
Por defecto la API ya viene con 2 usuarios para poder comenzar a probar inmediatamente:

### Usuario tipo "CUSTOMER"
```
{
  "email": "drstrange@marvel.com",
  "password": "multiverso"
}
```

### Usuario tipo "ADMIN"
```
{
  "email": "superman@dc.com",
  "password": "superman"
}
```
