import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
  CssBaseline
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";


function App() {
  const [opgaver, setOpgaver] = useState([]);
  const [nyOpgave, setNyOpgave] = useState("");
  const [darkMode, setDarkMode] = useState(false);


  const tilføjOpgave = () => {
    if (nyOpgave.trim() === "") return;
    setOpgaver([...opgaver, nyOpgave]);
    setNyOpgave("");
  };

  const fjernOpgave = (index) => {
    const opdateretOpgaver = opgaver.filter((_, i) => i !== index);
    setOpgaver(opdateretOpgaver);
  };

  const toggleThem = () => {
    setDarkMode(!darkMode)
  }

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Container align='center' maxWidth="sm"
    sx={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
      <header>
        <Typography variant="h3" align="center" gutterBottom>
          📝 Min To-Do Liste
        </Typography>
        <IconButton onClick={toggleThem} sx={{ml: 1}}>{darkMode ? <Brightness7Icon /> : <Brightness4Icon /> }</IconButton>
      </header>

      <main>
        <Paper sx={{ p: 8 }}>
          <section>
            <TextField
              fullWidth
              label="Tilføj en opgave..."
              variant="outlined"
              value={nyOpgave}
              onChange={(e) => setNyOpgave(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" fullWidth onClick={tilføjOpgave}>
              Tilføj
            </Button>
          </section>

          <section>
            <List sx={{ mt: 2 }}>
              {opgaver.map((opgave, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" color="error" onClick={() => fjernOpgave(index)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={opgave} />
                </ListItem>
              ))}
            </List>
          </section>
        </Paper>
      </main>

      <footer>
        <Typography align="center" sx={{ mt: 3, color: "gray" }}>
          Lavet med ❤️ af Canh
        </Typography>
      </footer>
    </Container>
    </ThemeProvider>
  );
}

export default App;
