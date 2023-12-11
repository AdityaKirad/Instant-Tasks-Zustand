import dayjs from "dayjs";
import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Menu, Search } from "@mui/icons-material";
import { Link } from "@tanstack/react-router";
import { shallow } from "zustand/shallow";
import { useTodos, useSliders } from "../store";

function SearchField() {
  const [search, searchSet] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const todos = useTodos((state) => state.todos, shallow);
  return (
    <Box position="relative" gridColumn="span 3" sx={{ gridRowStart: 2 }}>
      <TextField
        label="Search Task"
        id="search-field"
        ref={inputRef}
        fullWidth
        onKeyUp={(e) => {
          if (e.key === "Enter") searchSet(true);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => searchSet(true)}>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {search ? (
        <ClickAwayListener onClickAway={() => searchSet(false)}>
          <Box
            position="absolute"
            top="6rem"
            zIndex={1}
            width="100%"
            padding="1rem"
            bgcolor="background.paper"
            borderRadius={1}
            sx={{
              "&>a": {
                display: "flex",
                justifyContent: "space-between",
                textDecoration: "none",
                color: "white",
                padding: "1rem",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "#22283180",
                },
              },
            }}
          >
            {Object.values(todos).map((todo) => {
              if (
                todo.title
                  .toLowerCase()
                  .includes(inputRef.current?.value.toLowerCase() as string)
              )
                return (
                  <Link>
                    <Typography component="span">{todo.title}</Typography>
                    <Typography component="span">{todo.date}</Typography>
                  </Link>
                );
            })}

            <Button
              variant="contained"
              size="small"
              fullWidth
              sx={{ marginTop: "1rem" }}
            >
              ALL RESULTS FOR "{inputRef.current?.value.toUpperCase()}"
            </Button>
          </Box>
        </ClickAwayListener>
      ) : null}
    </Box>
  );
}

function SearchAndNavbar() {
  const [menuSet, todaysTasksSet] = useSliders((state) => [
    state.menuSet,
    state.todaysTasksSet,
  ]);
  return (
    <Box
      display={{ xs: "grid", md: "flex" }}
      rowGap="1rem"
      justifyContent="space-between"
      gridTemplateColumns="1fr 1fr 1fr"
      alignItems="center"
    >
      <IconButton
        sx={{
          display: { xl: "none" },
          marginRight: "1rem",
          justifySelf: "start",
        }}
        onClick={() => menuSet(true)}
      >
        <Menu />
      </IconButton>
      <SearchField />
      <Box textAlign="center" marginInline="auto">
        <Typography fontWeight={700}>Instant Tasks</Typography>
        <Typography>{dayjs().format("YYYY, MMM DD")}</Typography>
      </Box>
      <Box
        display="inline-flex"
        alignItems="center"
        gap="1rem"
        justifySelf="end"
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            position: { xs: "fixed", sm: "static" },
            bottom: "1rem",
            right: "1rem",
          }}
        >
          ADD NEW TASK
        </Button>
        <IconButton
          sx={{ display: { xl: "none" } }}
          onClick={() => todaysTasksSet(true)}
          disableRipple
        >
          <Avatar src="/avatar.jpg" alt="avatar" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default SearchAndNavbar;
