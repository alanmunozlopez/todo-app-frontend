import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { Add as AddIcon, CheckCircle as CheckIcon } from "@mui/icons-material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          TODO App Frontend
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Using mui for testing
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCount((count) => count + 1)}
            >
              Vite Count: {count}
            </Button>

            <Button
              variant="outlined"
              startIcon={<CheckIcon />}
              color="success"
            >
              Outlined
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
