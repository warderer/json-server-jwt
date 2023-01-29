# Mock de API con Autenticación usando JWT

El objetivo es crear un mock de una API Rest de eCommerce que haga uso de autenticación con JWT y cuente con algunas rutas protegidas.

Para usarlo:
1) Haz git clone del repositorio: `git clone https://github.com/warderer/json-server-jwt.git`
2) Instala las dependencias con el comando: `npm install`
3) Ejecuta el servidor con el comando: `npm run dev`

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
  "password": "multiverso",
}
```
Al iniciar sesión se devolvera un JWT que contiene, entre otras cosas el `id` y `role` del usuario en el payload.

#### getAllUsers
`GET`
`/users`


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

#### GetOneItem
`GET`
`/items/:id`


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