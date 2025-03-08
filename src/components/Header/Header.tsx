import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavButton } from "@/components/Button/NavButton";
import Switch from "@mui/material/Switch";
import { containerSx } from "@/components/Todolist/TodolistItem.styles";
import Container from "@mui/material/Container";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { selectThemeMode } from "@/app/app-selectors";
import { getTheme } from "@/common/theme/theme";
import { changeThemeModeAC } from "@/app/app-reducer";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }));
  };

  return (
    <AppBar position='static' sx={{ mb: "30px" }}>
      <Toolbar sx={containerSx}>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color='inherit'>
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
