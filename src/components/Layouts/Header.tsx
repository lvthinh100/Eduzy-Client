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
import useAuth from "../../hooks/useAuth";
import MESSAGE from "../../constants/message";
import { logout } from "../../api";
import { authActions } from "../../redux/slices/authSlice";
import Crown from "../Crown";
import { Stack } from "@mui/material";
import Coins from "../Coins";

function ResponsiveAppBar() {
  const isDesktop = useResponsive("up", "md");
  const [openNav, setOpenNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const { user } = useAuth();

  const dispatch = useAppDispatch();

  // Mobile
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
  // End Mobile

  // Auth Modal
  const handleOpenLoginModal = () => {
    dispatch(appActions.toggleShowLoginModal());
    handleCloseUserMenu();
  };
  const handleOpenRegisterModal = () => {
    dispatch(appActions.toggleShowRegisterModal());
    handleCloseUserMenu();
  };
  // End Auth modal

  // USER ACTION
  const [anchorElUserAction, setAnchorElUserAction] =
    React.useState<null | HTMLElement>(null);

  const handleOpenUserActionMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserAction(event.currentTarget);
  };
  const handleCloseUserActionMenu = () => {
    setAnchorElUserAction(null);
  };
  // END USER ACTION

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authActions.logout());
      dispatch(
        appActions.showNotification({
          variant: "success",
          message: MESSAGE.LOGOUT_SUCCESS,
        })
      );
      handleCloseUserActionMenu();
    } catch (err) {
      dispatch(
        appActions.showNotification({
          variant: "error",
          message: MESSAGE.UNKNOWN_ERROR,
        })
      );
    }
  };

  const notAuthAction = (
    <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
      <NavLinkStyled mr={2} onClick={handleOpenLoginModal}>
        {
          <content.NAV_AUTH.login.icon
            sx={{ mr: 0.6, width: "18px", height: "18px" }}
          />
        }

        {content.NAV_AUTH.login.text}
      </NavLinkStyled>
      <NavLinkStyled onClick={handleOpenRegisterModal}>
        {
          <content.NAV_AUTH.register.icon
            sx={{ mr: 0.6, width: "18px", height: "18px" }}
          />
        }

        {content.NAV_AUTH.register.text}
      </NavLinkStyled>
    </Box>
  );

  const isAuthContent = (
    <Box display="inline-block">
      <Stack direction="row" alignItems="center">
        <Stack
          justifyContent="center"
          alignItems="center"
          display="flex"
          mr={1}
        >
          <Stack direction="row" display="flex" alignItems="center" mb={1.3}>
            <Crown
              quantity={user?.crowns1}
              variant="first"
              style={{ margin: "0px 5px" }}
            />
            <Crown
              quantity={user?.crowns2}
              variant="second"
              style={{ margin: "0px 5px" }}
            />
            <Crown
              quantity={user?.crowns3}
              variant="third"
              style={{ margin: "0px 5px" }}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ marginLeft: "auto" }}
          >
            <Coins value={user?.coins} variant="first" />
          </Stack>
        </Stack>
        <IconButton onClick={handleOpenUserActionMenu} sx={{ p: 0 }}>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </IconButton>
        <Menu
          sx={{ mt: "40px" }}
          id="menu-appbar"
          anchorEl={anchorElUserAction}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUserAction)}
          onClose={handleCloseUserActionMenu}
        >
          {content.USERS.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserActionMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
          {/* {content.NAV_AUTH.map((link) => (
              <MenuItem key={link.text} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{link.text}</Typography>
              </MenuItem>
            ))} */}
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">Đăng xuất</Typography>
          </MenuItem>
        </Menu>
      </Stack>
    </Box>
  );

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

          {user ? isAuthContent : notAuthAction}

          {/* Avatar */}
          {!isDesktop && !user && (
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
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleOpenLoginModal}>
                  <Typography textAlign="center">
                    {content.NAV_AUTH.login.text}
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    textAlign="center"
                    onClick={handleOpenRegisterModal}
                  >
                    {content.NAV_AUTH.register.text}
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
