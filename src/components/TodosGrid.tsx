import {
  CalendarMonth,
  Check,
  Close,
  Delete,
  MoreVert,
  Star,
  StarOutline,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  type Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { type TodosProps, useTodos, useTodosSortAndOrder } from "../store";
import { shallow } from "zustand/shallow";

function CompleteButton({ completed }: { completed: boolean }) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  return isMobile ? (
    <Button variant="contained" sx={{ borderRadius: 1 }}>
      {completed ? "Completed" : "Incomplete"}
    </Button>
  ) : (
    <IconButton>{completed ? <Check /> : <Close />}</IconButton>
  );
}

function TodosCard({ todo }: { todo: TodosProps }) {
  const { title, description, directory, date, completed, important } = todo;
  return (
    <Box display="flex" flexDirection="column">
      <Button
        variant="contained"
        disableElevation
        sx={{ borderRadius: "4px 4px 0 0", marginInline: "auto 1rem" }}
      >
        {directory}
      </Button>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="20rem"
        padding="1rem"
        borderRadius={1}
        bgcolor="background.paper"
      >
        <Box>
          <Typography>{title}</Typography>
          <Typography>{description}</Typography>
        </Box>
        <Box>
          <Typography>
            <CalendarMonth sx={{ marginRight: "1rem" }} /> {date}
          </Typography>
          <Divider sx={{ marginBlock: "1rem" }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <CompleteButton completed={completed} />
            <IconButton>{important ? <Star /> : <StarOutline />}</IconButton>
            <IconButton>
              <Delete />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function TodosGrid() {
  const todos = useTodos((state) => state.todos, shallow);
  const order = useTodosSortAndOrder((state) => state.order);
  return (
    <>
      <Typography marginBlock="1rem">All Tasks(3)</Typography>
      <Box
        display="grid"
        gridTemplateColumns={
          order === "grid"
            ? {
                xs: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))",
                xl: "repeat(3, minmax(0, 1fr))",
              }
            : {}
        }
        gap={2}
        marginTop="1rem"
        paddingInline="2rem"
      >
        {Object.values(todos).map((todo) => (
          <TodosCard key={todo.id} todo={todo} />
        ))}
      </Box>
    </>
  );
}
