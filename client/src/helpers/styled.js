import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Card,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledAppBar = styled(AppBar)`
  height: 13vh;
  background-color: #183c44;
`;

const StyledToolbar = styled(Toolbar)`
  height: 13vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  font-size: 2.4rem;
  letter-spacing: 15px;
`;

const StyledStack = styled(Stack)`
  width: 400px;
  margin-right: 5em;
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  font-size: 1em;
  color: #ffff;
`;

const StyledCard = styled(Card)`
  max-width: 600px;
  margin: auto;
  text-align: center;
  margin-top: 3rem;
  padding-bottom: 2em;
  background-color: #183c44;
`;

const StyledTextField = styled(TextField)`
  margin-left: 1rem;
  margin-right: 1rem;
  width: 300px;
  color: #ffffff;
`;

export {
  StyledAppBar,
  StyledButton,
  StyledStack,
  StyledToolbar,
  StyledTypography,
  StyledCard,
  StyledTextField,
};
