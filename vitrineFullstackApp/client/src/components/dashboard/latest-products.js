import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
} from '@mui/material';
import NextLink from 'next/link'

export const LatestProducts = (props) => (
  <Card {...props}>
    <CardHeader
      title="Minhas redes sociais"
    />
    <Divider />
    <List>
      <ListItem>
        <ListItemAvatar>
          <img
            alt='GitHub'
            src='/static/images/cars/social1.png'
            style={{
              height: 48,
              width: 48
            }}
          />
        </ListItemAvatar>

        <NextLink
          href="https://github.com/eduardolpsss"
          passHref
        >
          <a target="_blank" style={{textDecoration: "none"}}>GitHub</a>
        </NextLink>
      </ListItem>

      <Divider/>

      <ListItem>
        <ListItemAvatar>
          <img
            alt='LinkedIn'
            src='/static/images/cars/social2.png'
            style={{
              height: 48,
              width: 48
            }}
          />
        </ListItemAvatar>

        <NextLink
          href="https://www.linkedin.com/in/eduardolpsss/"
          passHref
        >
          <a target="_blank" style={{textDecoration: "none"}}>LinkedIn</a>
        </NextLink>
      </ListItem>
      
      <Divider/>
            
      <ListItem>
        <ListItemAvatar>
          <img
            alt='Portifolio'
            src='/static/images/cars/social3.png'
            style={{
              height: 48,
              width: 48
            }}
          />
        </ListItemAvatar>
        
        <NextLink
          href="https://eduardopontes.netlify.app/"
          passHref
        >
          <a target="_blank" style={{textDecoration: "none"}}>My React portifolio</a>
        </NextLink>
      </ListItem>
    </List>
  </Card>
);
