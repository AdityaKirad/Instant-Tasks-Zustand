import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItemText,
  Modal,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTodos } from "../store";
import { useState } from "react";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.background.default,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}));

function ProgressBar({
  taskType,
  totalTask,
  completedTask,
}: {
  taskType: string;
  completedTask: number;
  totalTask: number;
}) {
  const completeTaskPercentage = (completedTask / totalTask) * 100;
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>{taskType} task</Typography>
        <Typography>
          {completedTask}/{totalTask}
        </Typography>
      </Box>
      <BorderLinearProgress
        variant="determinate"
        value={completeTaskPercentage}
      />
    </Box>
  );
}

function DeleteAllDataModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  function deleteAllData() {
    useTodos.persist.clearStorage();
    onClose();
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        maxWidth="50rem"
        width="100%"
        bgcolor="background.paper"
        padding="1rem"
        borderRadius={1}
        sx={{ translate: "-50% -50%" }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Are you sure?</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Typography>All data will be deleted permanently</Typography>
        <Box display="flex" justifyContent="end" gap="1rem" marginTop="1rem">
          <Button variant="contained" onClick={deleteAllData}>
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}

function TodaysTaskList({ tasks }: { tasks: string[] }) {
  return (
    <Box>
      <Typography>Tasks today</Typography>
      <List>
        {tasks.map((task, index) => (
          <ListItemText primary={task} key={index} />
        ))}
      </List>
    </Box>
  );
}

function TodaysTaskBar() {
  const [displayDeleteAllDataModal, displayDeleteAllDataModalSet] =
    useState(false);
  return (
    <>
      <Box
        position={{ xl: "fixed" }}
        display="flex"
        flexDirection="column"
        gap="1rem"
        padding="1rem"
        height="100%"
        bgcolor="background.paper"
        top={0}
        right={0}
        width={{ xl: "20%" }}
        zIndex={10}
        sx={{
          overflowY: "auto",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop="1rem"
          gap="1rem"
        >
          <Typography textAlign="center">Hi, User!</Typography>
          <Avatar src="/avatar.jpg" />
        </Box>

        <ProgressBar taskType="All" completedTask={3} totalTask={5} />
        <ProgressBar taskType="Today" completedTask={2} totalTask={4} />

        <Divider color="black" sx={{ borderBottomWidth: "medium" }} />

        <TodaysTaskList tasks={["Task 1", "Task 2", "Task 3"]} />

        <Button
          sx={{ marginBlock: "auto 0" }}
          onClick={() => displayDeleteAllDataModalSet(true)}
        >
          DELETE ALL DATA
        </Button>
        <Typography
          textAlign="center"
          padding="3rem"
          border="2px solid black"
          borderRadius={4}
        >
          Made by Aditya Kirad
        </Typography>
      </Box>
      <DeleteAllDataModal
        open={displayDeleteAllDataModal}
        onClose={() => displayDeleteAllDataModalSet(false)}
      />
    </>
  );
}
export default TodaysTaskBar;
