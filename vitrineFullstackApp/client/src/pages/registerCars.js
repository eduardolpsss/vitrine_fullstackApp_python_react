import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
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
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required('First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required('Last name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: () => {
      Router
        .push('/')
        .catch(console.error);
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
              
              {/* First name (firstName) -> Título do anúncio (title) */}
              <TextField
                error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="Título do anúncio"
                margin="normal"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                variant="outlined"
              />

              {/* Lasr name (lastName) -> Ano do veículo (year) */}
              <TextField
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Ano do veículo"
                margin="normal"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                variant="outlined"
              />

              {/* Endereço de e-mail (email) -> Kilometragem do veículo (kilometre) */}
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Kilometragem do veículo"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />

              {/* Senha (password) -> Local onde o veículo se encontra (city)*/}
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Local onde o veículo se encontra"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />

              {/* Preço do veículo (price)*/}
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Preço do veículo"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              
              {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>
                  {formik.errors.policy}
                </FormHelperText>
              )}
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
