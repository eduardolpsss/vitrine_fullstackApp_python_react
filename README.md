# vitrine_fullstack_python
 
RESTful API Fullstack desenvolvido utilizando Python no back-end, o microframework Flask provê um built-in development server. O front-end foi desenvolvido com React e o banco de dados utilizado foi o MongoDB.

## Front-end

O front-end dessa aplicação foi desenvolvido utilizando  MUI's components, React e Next.js, para iniciar o servidor é só seguir os seguintes passos:


- Install dependencies: `npm install` ou `yarn`

- Start no servidor: `npm run dev` ou `yarn dev`

- Views em: `localhost:3000`

## Back-end

O back-end da aplicação foi desenvolvido utilizando Python com o microframework Flask para gerir um built-in development server, para iniciá-lo é necessário seguir os seguintes passos:

- Na pasta do back-end: `.\venv\Scripts\activate`

- Com os scripts ativos: `python .\src\app.py`

- Views em: `http://localhost:5000/cars` ou `http://127.0.0.1:5000/cars`

## Banco de dados

O banco de dados escolhido para o projeto foi o MongoDB, para ter uma melhor visualização dele é necessário o uso de sua interface, o MongoDB Compass, para uso no terminal foi utilizado o MongoDB Shell os dois podem ser baixados em: https://www.mongodb.com/try/download/tools.

Para visualizar o banco de dados no MongoDb Compass só é necessário colocar o endereço de app.config['MONGO_URI'] que se localiza no back-end no campo URI de novas conexões e conectar.

- Views em: `mongodb://localhost/pythonReactCarsData`

É necessário definir as varíaveis de ambiente do sistema para uso no terminal se a utilização ocorrer no Windows, o caminho da pasta bin das instalações, tanto do Compass como do Shell do banco devem ser incluídos na variável Path do sistema, são elas (exempli com o caminho padrão que vem no instalador da Microsoft):

- C:\Program Files\MongoDB\Server\6.0\bin (servidor)

- C:\Program Files\MongoDB\Tools\100\bin (Shell)

- C:\Program Files\mongosh\bin (comandos)

A visualização pelo terminal, após conectado, é feita atraves dos comandos:

- Para inicializar o MongoDB: `mongosh`

- Para visualizar os bancos existentes: `show dbs` ou `show collections`

- Para utilizar um banco da lista (o referente ao projeto): `use pythonReactCarsData`

- Para listar os objetos JSON que estão no banco de forma identada: `db.cars.find().pretty()`

