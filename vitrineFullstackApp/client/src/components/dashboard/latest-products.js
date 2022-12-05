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
            target="_blank"
          >
            <a target="_blank">GitHub</a>
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
            target="_blank"
          >
            <a target="_blank">LinkedIn</a>
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
            target="_blank"
          >
            <a target="_blank">My React portifolio</a>
          </NextLink>
        </ListItem>
        {/* <Divider/>
        {products.map((product, i) => (
        <ListItem
          divider={i < products.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
              {product.name}
        </ListItem>
      ))} */}
    </List>
  </Card>
);
