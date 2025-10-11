import React, { useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import { useAuth } from "../../Features/Context/Context.jsx/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();
    let {loginAsAdmin} = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    
    e.preventDefault();
    const res = await loginAsAdmin(form.email, form.password);

    console.log("Login data:", res);
    
    if (res.success) {
      console.log("Login successful ");
      navigate("/"); // 
    } else {
      console.log("Login failed ");
      alert("Invalid email or password");
    }
  
    
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        padding:0,
        margin:0
      }}
    >
      {/* كبرنا البوكس */}
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            textAlign: "center",
            width: "100%",
            maxWidth: 500, // أقصى عرض ثابت عشان الشكل يفضل متناسق
            mx: "auto",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                py: 1.2,
                borderRadius: 2,
                backgroundColor: "#2575fc",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { backgroundColor: "#1a5edb" },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography
            variant="body2"
            sx={{ mt: 2, color: "text.secondary", cursor: "pointer" }}
          >
            Forgot your password?
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
