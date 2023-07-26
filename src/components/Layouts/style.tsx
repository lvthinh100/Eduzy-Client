import { LinkProps, styled } from "@mui/material";
import CustomLink from "../CustomComponent/CustomLink";

const NavLinkStyled = styled(CustomLink)<LinkProps>(({ theme }) => ({
  fontWeight: "bold",
  fontSize: 12,
  textDecoration: "none",
  textTransform: "uppercase",
  color: theme.palette.lighter.main,
  opacity: 0.6,
  "&:hover": {
    opacity: 1,
  },
}));

export default NavLinkStyled;
