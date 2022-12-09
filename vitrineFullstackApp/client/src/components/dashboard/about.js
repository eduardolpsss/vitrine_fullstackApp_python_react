import { Card, CardContent, CardHeader, Divider, useTheme, Typography } from '@mui/material';

export const About = (props) => {
  const theme = useTheme();

  return (
    <Card {...props}>
      <CardHeader
        title="Sobre"
      />
      <Divider />
      <CardContent>
      
      <Typography variant='h5' sx={{mt: 2, mb: 3}}>
        # vitrine_fullstack_python
      </Typography>

      <Typography variant='body2' sx={{mb: 3}}>
      RESTful API Fullstack desenvolvido utilizando Python no back-end, o microframework Flask provê um built-in development server. O front-end foi desenvolvido com React e o banco de dados utilizado foi o MongoDB.
      </Typography>

      <Typography variant='h6' sx={{mb: 3}}>
          ## Front-end
      </Typography>

      <Typography variant='body2' sx={{mb: 3}}>
          O front-end dessa aplicação foi desenvolvido utilizando  MUI's components, React e Next.js, para iniciar o servidor é só seguir os seguintes passos:
      </Typography>


        <ul>
            <li>Install dependencies: `npm install` ou `yarn`</li>
            <li>Start no servidor: `npm run dev` ou `yarn dev`</li>
            <li>Views em: `localhost:3000`</li>
        </ul>

        <Typography variant='h6' sx={{mt: 3,mb: 3}}>
            ## Back-end
        </Typography>

        <Typography variant='body2' sx={{mb: 3}}>
            O back-end da aplicação foi desenvolvido utilizando Python com o microframework Flask para gerir um built-in development server, para iniciá-lo é necessário seguir os seguintes passos:
        </Typography>

        <ul>
            <li>Na pasta do back-end: `.\venv\Scripts\activate`</li>
            <li>Com os scripts ativos: `python .\src\app.py`</li>
            <li>Views em: `http://localhost:5000/cars` ou `http://127.0.0.1:5000/cars`</li>
        </ul>

        <Typography variant='h6' sx={{mt: 3,mb: 3}}>
            ## Banco de dados
        </Typography>

        <Typography variant='body2' sx={{mb: 3}}>
            O banco de dados escolhido para o projeto foi o MongoDB, para ter uma melhor visualização dele é necessário o uso de sua interface, o MongoDB Compass, para uso no terminal foi utilizado o MongoDB Shell os dois podem ser baixados em: https://www.mongodb.com/try/download/tools.
        </Typography>

        <Typography variant='body2' sx={{mb: 3}}>
            Para visualizar o banco de dados no MongoDb Compass só é necessário colocar o endereço de app.config['MONGO_URI'] que se localiza no back-end no campo URI de novas conexões e conectar.
        </Typography>

        <ul>
            <li>Views em: `mongodb://localhost/pythonReactCarsData`</li>
        </ul>

        <Typography variant='body2' sx={{mt: 3,mb: 3}}>
            É necessário definir as varíaveis de ambiente do sistema para uso no terminal se a utilização ocorrer no Windows, o caminho da pasta bin das instalações, tanto do Compass como do Shell do banco devem ser incluídos na variável Path do sistema, são elas (exempli com o caminho padrão que vem no instalador da Microsoft):
        </Typography>


        <ul>
            <li>C:\Program Files\MongoDB\Server\6.0\bin (servidor)</li>
            <li>C:\Program Files\MongoDB\Tools\100\bin (Shell)</li>
            <li>C:\Program Files\mongosh\bin (comandos)</li>
        </ul>

        <Typography variant='body2' sx={{mt: 3,mb: 3}}>
            A visualização pelo terminal, após conectado, é feita atraves dos comandos:
        </Typography>

        <ul>
          <li>Para inicializar o MongoDB: `mongosh`</li>
          <li>Para visualizar os bancos existentes: `show dbs` ou `show collections`</li>
          <li>Para utilizar um banco da lista (o referente ao projeto): `use pythonReactCarsData`</li>
          <li>Para listar os objetos JSON que estão no banco de forma identada: `db.cars.find().pretty()`</li>
        </ul>
      </CardContent>
    </Card>
  );
};
