import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import logo from "../assets/images/logo.webp";

const About = () => {
  return (
    <Container maxWidth="md" sx={{color: "#183c44"}}>
      <Typography variant="h3" align="center" gutterBottom mt={3}>
        About Catalog Application
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={logo}
              alt="Catalog App"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Welcome to Catalog Application!
            </Typography>
            <Typography variant="body1" paragraph>
              Experience seamless catalog organization with Catalo Application,
              a comprehensive web application designed to simplify your catalog
              management tasks. Catalog Application offers a user-centric
              interface that empowers you to effortlessly manage and maintain
              your catalog.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're curating a personal collection, streamlining
              inventory for your business, or simply seeking an efficient
              catalog management tool, Catalog Application is your go-to
              solution.
            </Typography>
            <Typography variant="body1" paragraph>
              Start your journey today and discover the power of simplified
              catalog management at your fingertips. Say goodbye to clutter and
              hello to organized bliss with Catalog Application!
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
