import "./App.css"
import { useAppSelector } from "@/common/hooks/useAppSelector"
import { ThemeProvider } from "@mui/material/styles"
import { getTheme } from "@/common/theme/theme"
import { selectThemeMode } from "./app-selectors"
import { Header } from "@/common/components/Header/Header"
import { Main } from "./Main"
import CssBaseline from "@mui/material/CssBaseline"

export type FilterValues = "All" | "Active" | "Completed"

export const App = () => {
  // dispatch({ type: "increment" });

  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
