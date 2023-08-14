import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavLinkStyled from "./style";
import { Link as RouterLink } from "react-router-dom";
import content from "../../constants/content";
import Logo from "../Logo";
import useResponsive from "../../hooks/useResponsive";
import { useAppDispatch } from "../../hooks/redux";
import { appActions } from "../../redux/slices/appSlice";

function ResponsiveAppBar() {
  const isDesktop = useResponsive("up", "md");
  const [openNav, setOpenNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispatch = useAppDispatch();

  const handleOpenNavMenu = () => {
    setOpenNav(true);
  };

  const handleCloseNavMenu = () => {
    setOpenNav(false);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenLoginModal = () => {
    dispatch(appActions.toggleShowLoginModal());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: "50px !important" }}>
          {/* Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer anchor="left" open={openNav} onClose={handleCloseNavMenu}>
              <List
                sx={{
                  height: "100%",
                  backgroundColor: "primary.main",
                }}
              >
                {content.NAV_LINK.map((page) => (
                  <ListItem key={page.text}>
                    <NavLinkStyled
                      key={page.text}
                      component={RouterLink}
                      to={page.path}
                      // onClick={handleCloseNavMenu}
                      sx={{ display: "flex", alignItems: "center", mr: 2 }}
                    >
                      <ListItemIcon>
                        {
                          <page.icon
                            fontSize="small"
                            sx={{ mr: 1, color: "white" }}
                          />
                        }
                      </ListItemIcon>
                      {page.text}
                    </NavLinkStyled>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>

          {!isDesktop && <Logo />}

          <NavLinkStyled
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
              fontSize: "18px",
              letterSpacing: ".1rem",
              fontFamily: "Montserrat",
              mx: 1,
            }}
          >
            {content.LOGO}
          </NavLinkStyled>

          {/* Large */}
          <NavLinkStyled
            href="google.com"
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 6,
              ml: 3,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "18px",
              letterSpacing: ".05rem",
              fontFamily: "Montserrat",
            }}
          >
            {content.LOGO}
          </NavLinkStyled>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {content.NAV_LINK.map((page) => (
              <NavLinkStyled
                key={page.text}
                component={RouterLink}
                to={page.path}
                // onClick={handleCloseNavMenu}
                sx={{ display: "flex", alignItems: "center", mr: 2 }}
              >
                {
                  <page.icon
                    fontSize="small"
                    sx={{ mr: 0.75, width: "14px", height: "14px" }}
                  />
                }
                {page.text}
              </NavLinkStyled>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {/* {content.NAV_AUTH.map((page) => (
              <NavLinkStyled
                key={page.text}
                component={RouterLink}
                to="/auth"
                // onClick={handleCloseNavMenu}
                sx={{ display: "flex", alignItems: "center", mr: 2 }}
              >
                {<page.icon sx={{ mr: 0.6, width: "18px", height: "18px" }} />}
                {page.text}
              </NavLinkStyled>
            ))} */}
            <NavLinkStyled mr={2} onClick={handleOpenLoginModal}>
              {
                <content.NAV_AUTH.login.icon
                  sx={{ mr: 0.6, width: "18px", height: "18px" }}
                />
              }

              {content.NAV_AUTH.login.text}
            </NavLinkStyled>
            <NavLinkStyled>
              {
                <content.NAV_AUTH.register.icon
                  sx={{ mr: 0.6, width: "18px", height: "18px" }}
                />
              }

              {content.NAV_AUTH.register.text}
            </NavLinkStyled>
          </Box>

          {/* Avatar */}
          {!isDesktop && (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {content.USERS.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
                {/* {content.NAV_AUTH.map((link) => (
                  <MenuItem key={link.text} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{link.text}</Typography>
                  </MenuItem>
                ))} */}
                <MenuItem>
                  <Typography textAlign="center">
                    {content.NAV_AUTH.login.text}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
