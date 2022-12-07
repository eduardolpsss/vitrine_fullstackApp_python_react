import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardLayout } from '../components/dashboard-layout';

const Page = () => {
  const formik = useFormik({
    initialValues: {
      kilometre: '',
      title: '',
      year: '',
      city: '',
      price: ''

    },
    validationSchema: Yup.object({
      kilometre: Yup
        .string()
        .max(255)
        .required('É necessário informar a kilometragem do veículo'),
      title: Yup
        .string()
        .max(255)
        .required('É necessário informar um título para o anúncio'),
      year: Yup
        .string()
        .max(255)
        .required('É necessário informar o ano do veículo'),
      city: Yup
        .string()
        .max(255)
        .required('É necessário informar o local onde o veículo se encontra'),
      price: Yup
        .string()
        .max(255)
        .required('É necessário informar o preço do veículo')
    }),
    onSubmit: async () => {
      let title = formik.values.title
      let year = formik.values.year
      let kilometre = formik.values.kilometre
      let city = formik.values.city
      let price = formik.values.price

      console.log(`Nome passado para o anúncio: ${title}`)
      console.log(`Ano passado para o anúncio: ${year}`)
      console.log(`Kilometragem passada para o anúncio: ${kilometre}`)
      console.log(`Cidade passada para o anúncio: ${city}`)
      console.log(`Preço passado para o anúncio: ${price}`)

      axios.post(`http://localhost:5000/cars`, {
        title: title,
        year: year,
        kilometre: kilometre,
        city: city,
        price: price
      }).then(response => {
        alert("Anuncio criado com sucesso!")
        window.location.reaload();
      })
      .catch(error => {
        if (error.response.data) {
          alert(`$(error.response.data.mensage)`)
          console.log(error.response.data)
          window.location.reaload();
        }
      })
    }
  });

  return (
    <>
      <Head>
        <title>
          Cadastro de carros usados | Verzel Cars
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/usedCars"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Voltar
            </Button>
          </NextLink>
          <Card>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography
                  color="textPrimary"
                  variant="h4"
                >
                  Cadastro de carros usados
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Insira as informações para cadastrar um veículo.
                </Typography>
              </Box>
              
              {/* Título do anúncio (title) */}
              <TextField
                error={Boolean(formik.touched.title && formik.errors.title)}
                fullWidth
                helperText={formik.touched.title && formik.errors.title}
                label="Título do anúncio"
                margin="normal"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
                variant="outlined"
              />

              {/* Ano do veículo (year) */}
              <TextField
                error={Boolean(formik.touched.year && formik.errors.year)}
                fullWidth
                helperText={formik.touched.year && formik.errors.year}
                label="Ano do veículo"
                margin="normal"
                name="year"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.year}
                variant="outlined"
              />

              {/* Kilometragem do veículo (kilometre) */}
              <TextField
                error={Boolean(formik.touched.kilometre && formik.errors.kilometre)}
                fullWidth
                helperText={formik.touched.kilometre && formik.errors.kilometre}
                label="Kilometragem do veículo"
                margin="normal"
                name="kilometre"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.kilometre}
                variant="outlined"
              />

              {/* Local onde o veículo se encontra (city)*/}
              <TextField
                error={Boolean(formik.touched.city && formik.errors.city)}
                fullWidth
                helperText={formik.touched.city && formik.errors.city}
                label="Local onde o veículo se encontra"
                margin="normal"
                name="city"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                variant="outlined"
              />

              {/* Preço do veículo (price)*/}
              <TextField
                error={Boolean(formik.touched.price && formik.errors.price)}
                fullWidth
                helperText={formik.touched.price && formik.errors.price}
                label="Preço do veículo"
                margin="normal"
                name="price"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="price"
                value={formik.values.price}
                variant="outlined"
              />
              
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Cadastrar veículo
                </Button>
              </Box>
            </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
