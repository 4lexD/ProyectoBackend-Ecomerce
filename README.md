# <center>Ecommerce-Backend</center>


## Deploy: https://proyectobackend-ecomerce-p9sp-dev.fl0.io/api

## Introducción
Este proyecto representa el backend de una aplicación de comercio electrónico.

## Stack Tecnológico
El backend está desarrollado en Node.js utilizando el framework Express. Utiliza una base de datos NoSQL MongoDB con el ODM Mongoose.

## Arquitectura en Capas
El código está organizado siguiendo una arquitectura en capas para mejorar la modularidad y la mantenibilidad del sistema. Las capas son las siguientes:

- **Data**: Encargada de la interacción directa con la base de datos y la definición de modelos.
- **Domain**: Contiene la lógica de negocio de la aplicación y las entidades principales.
- **Presentation**: Maneja las peticiones HTTP, la validación de datos y la respuesta al cliente.

  ## Patrones de Diseño
Se aplican varios patrones de diseño en el código:

- **Singleton**: Se utiliza para garantizar que ciertos objetos sean instanciados una sola vez.
- **Repository**: Abstrae la capa de datos, permitiendo un desacoplamiento entre la lógica de negocio y la base de datos.
- **Factory**: Se aplica para la creación de ciertos objetos de manera controlada.
- **Adapter**: Permite la interacción entre interfaces incompatibles, facilitando la integración de sistemas o componentes.

## Inyección de Dependencias
Se utiliza la librería Awilix para gestionar la inyección de dependencias, lo que facilita la escalabilidad y mantenimiento del código.

## Contenedorización
El proyecto incluye un Dockerfile y un archivo docker-compose para permitir la ejecución de la aplicación en un entorno contenerizado.

## Seguridad con JWT
Se implementa JSON Web Tokens (JWT) para autenticar y autorizar a los usuarios. Esto proporciona una capa adicional de seguridad en las comunicaciones.


## Instalación y Ejecución
Para instalar las dependencias y ejecutar la aplicación, sigue los siguientes pasos:

1. Clona el repositorio a tu máquina local.
2. Asegúrate de tener Node.js y npm instalados.
3. Ejecuta `npm install` para instalar las dependencias.
4. Configura las variables de entorno en un archivo `.env`.
5. Ejecuta la aplicación con `npm run dev`.

¡Listo! La aplicación debería estar funcionando en tu entorno local.

## Contribuciones
¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes alguna sugerencia, por favor crea un issue o envía un pull request.

# Comandos de inicio

```shell
npm run command -- addUser -e admin@admin.com -fn admin -ln admin -p 12345678 -a 32 -ia true
```

## Docker Commands

Construir imagen
* docker build -t ecomerce_app .

Listar las imágenes de docker
* docker images

Mostrar los procesos (contenedores) que se están ejecutando
* docker ps -a

Crear contendor y correrlo en el puerto 8081 con el nombre node_coder
* docker run -p 8081:8081 --name ecomerce_app -d ecomerce_app

Destruir el contenedor
* docker rm ecomerce_app

Parar la ejecución del contenedor
* docker stop ecomerce_app

Comenzar la ejecución del contenedor ya creado previamente
* docker start ecomerce_app

Mostrar los logs del contenedor, para salir presionar Ctrl + C
* docker logs -f ecomerce_app

## Docker Compose

Levantar los contenedores
* docker-compose up

Parar los contenedores
* docker-compose stop

Remover los contenedores
* docker-compose down
