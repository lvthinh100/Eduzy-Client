import { LinkProps, styled } from "@mui/material";
import CustomLink from "../CustomComponent/CustomLink";

const NavLinkStyled = styled(CustomLink)<LinkProps>(({ theme }) => ({
  fontSize: 14,
  fontWeight: 100,
  textDecoration: "none",
  textTransform: "none",
  color: theme.palette.lighter.main,
  opacity: 0.6,
  "&:hover": {
    opacity: 1,
  },
}));

export default NavLinkStyled;
