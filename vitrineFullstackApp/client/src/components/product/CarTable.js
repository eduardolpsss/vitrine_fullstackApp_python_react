import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography, IconButton } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import settingsRef from '@mui/icons-material/Settings';


export const CarTable = ({ car, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt="Car"
          src={car.media}
          variant="square"
          sx={{width: 300, height: 300}}
        />
      </Box>

      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {car.title}
      </Typography>
      
      <Typography
        align="center"
        color="textSecondary"
        variant="body1"
      >
        {car.year} • {car.kilometre}km • {car.city}
      </Typography>
    </CardContent>

    <Box sx={{ flexGrow: 1 }} />

    <Divider />

    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <AttachMoneyIcon color='success' />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 0 }}
            variant="body1"
          >
            {car.price}
          </Typography>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'right' }}
      >
        <Box>
            <IconButton
                sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
                ml: 1
                }}
            >
                <EditIcon color='success' />
            </IconButton>
            
            <IconButton
                sx={{
                    cursor: 'pointer',
                    height: 40,
                    width: 40,
                    ml: 1
                }}
            >
                <ClearIcon color='error' />
            </IconButton>
        </Box>
      </Grid>
    </Box>
  </Card>
);

CarTable.propTypes = {
  car: PropTypes.object.isRequired
};
