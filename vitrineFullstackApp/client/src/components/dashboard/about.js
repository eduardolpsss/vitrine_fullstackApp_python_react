import { Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';

export const About = (props) => {
  const theme = useTheme();

  return (
    <Card {...props}>
      <CardHeader
        title="Sobre"
      />
      <Divider />
      <CardContent>
        <p>RESTful API Fullstack desenvolvido utilizando Python no back-end, o microframework Flask provê um built-in development server. O front-end foi desenvolvido com React.</p>
      </CardContent>
    </Card>
  );
};
