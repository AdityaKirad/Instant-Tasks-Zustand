import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Apps, List } from "@mui/icons-material";
import { useTodosSortAndOrder } from "../store";

function SortFunctionSelector() {
  const [sortFunction, setSortFunction] = useState("");
  return (
    <FormControl sx={{ minWidth: "12rem" }}>
      <InputLabel id="todos-sort">Sort by</InputLabel>
      <Select
        labelId="todos-sort"
        id=""
        label="Sort by"
        value={sortFunction}
        onChange={(e) => setSortFunction(e.target.value)}
      >
        <MenuItem value="Sort by">Sort by</MenuItem>
        <MenuItem value="Earlier first">Earlier first</MenuItem>
        <MenuItem value="Later first">Later first</MenuItem>
        <MenuItem value="Incomplete first">Incomplete First</MenuItem>
        <MenuItem value="Important & Incomplete first">
          Important First
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function OrderTodos() {
  const [order, setOrder] = useTodosSortAndOrder((state) => [
    state.order,
    state.setOrder,
  ]);
  return (
    <Box display="flex">
      <Button
        disableRipple
        onClick={() => setOrder("grid")}
        sx={{ outline: order === "grid" ? "2px solid white" : null }}
      >
        <Apps />
      </Button>
      <Button
        disableRipple
        onClick={() => setOrder("list")}
        sx={{ outline: order === "list" ? "2px solid white" : null }}
      >
        <List />
      </Button>
    </Box>
  );
}

export default function TodosSortAndOrder() {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <OrderTodos />
      <SortFunctionSelector />
    </Box>
  );
}
