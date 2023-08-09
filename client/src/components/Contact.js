import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Link,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Contact = () => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={3}
      >
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400, backgroundColor: "#183c44", color: "white" }}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                Contact
              </Typography>
              <Typography variant="body1" paragraph mt={3}>
                Feel free to reach out to us with any questions, feedback, or
                issues you may have.
              </Typography>
              <Typography
                variant="body2"
                display="flex"
                alignItems="center"
                mt={2}
                mb={2}
              >
                <EmailIcon sx={{ marginRight: "0.5rem" }} />
                mark.zack@email.com
              </Typography>
              <Typography
                variant="body2"
                display="flex"
                alignItems="center"
                mt={2}
                mb={2}
              >
                <PhoneIcon sx={{ marginRight: "0.5rem" }} />
                +387 62 62 62
              </Typography>
              <Typography
                variant="body2"
                align="center"
                color="textSecondary"
                mt={9}
                sx={{color: "white"}}
              >
                Follow us on social media:
              </Typography>
              <CardActions disableSpacing sx={{ justifyContent: "center" }}>
                <IconButton
                  aria-label="Twitter"
                  component={Link}
                  href="https://twitter.com"
                  sx={{ color: "#1DA1F2" }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  aria-label="LinkedIn"
                  component={Link}
                  href="https://www.linkedin.com"
                  sx={{ color: "#0A66C2" }}
                >
                  <LinkedInIcon />
                </IconButton>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
