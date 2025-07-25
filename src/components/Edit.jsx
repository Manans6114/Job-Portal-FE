import React, { useEffect, useState, useContext } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state.id);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchInitialPosts = async (id) => {
      const response = await axios.get(`http://localhost:8080/jobPost/${id}`);
      console.log(response.data);
      setForm(response.data);
    };
    fetchInitialPosts(currId);
  }, [currId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/jobPost", form)
      .then((resp) => {
        console.log(resp.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setForm((prev) => ({
        ...prev,
        postTechStack: [...prev.postTechStack, value],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        postTechStack: prev.postTechStack.filter((skill) => skill !== value),
      }));
    }
  };

  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
  ];

  return (
    <Paper
      sx={{
        padding: "1%",
        backgroundColor: darkMode ? "var(--bg-color)" : "inherit",
        color: darkMode ? "var(--text-color)" : "inherit",
      }}
      elevation={0}
    >
      <Typography
        sx={{
          margin: "3% auto",
          color: darkMode ? "var(--text-color)" : "inherit",
        }}
        align="center"
        variant="h5"
      >
        Edit Job Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            type="number"
            sx={textFieldStyles(darkMode)}
            onChange={(e) => setForm({ ...form, postId: e.target.value })}
            label="Enter your Post ID"
            variant="outlined"
            value={form.postId}
          />
          <TextField
            type="text"
            sx={textFieldStyles(darkMode)}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={form.postProfile}
          />
          <TextField
            type="number"
            sx={textFieldStyles(darkMode)}
            required
            onChange={(e) =>
              setForm({ ...form, reqExperience: e.target.value })
            }
            label="Years of Experience"
            variant="outlined"
            value={form.reqExperience}
          />
          <TextField
            type="text"
            sx={textFieldStyles(darkMode)}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={form.postDesc}
          />
          <Box
            sx={{
              margin: "1% auto",
              color: darkMode ? "var(--text-color)" : "inherit",
            }}
          >
            <h3>Please mention required skills</h3>
            <ul>
              {skillSet.map(({ name }, index) => {
                const checkboxId = `custom-checkbox-${index}`;
                return (
                  <li key={index}>
                    <input
                      type="checkbox"
                      id={checkboxId}
                      name={name}
                      value={name}
                      checked={form.postTechStack.includes(name)}
                      onChange={handleChange}
                    />
                    <label htmlFor={checkboxId}>{name}</label>
                  </li>
                );
              })}
            </ul>
          </Box>
          <Button
            sx={{
              width: "50%",
              margin: "2% auto",
              backgroundColor: darkMode ? "#1976d2" : undefined,
            }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

const textFieldStyles = (darkMode) => ({
  width: "50%",
  margin: "2% auto",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.23)",
    },
    "&:hover fieldset": {
      borderColor: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.23)",
    },
  },
  "& .MuiInputLabel-root": {
    color: darkMode ? "var(--text-color)" : "inherit",
  },
  "& .MuiOutlinedInput-input": {
    color: darkMode ? "var(--text-color)" : "inherit",
  },
});

export default Edit;
