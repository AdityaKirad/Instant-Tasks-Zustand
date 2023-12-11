import { type FormEvent, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  Close,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Link } from "@tanstack/react-router";
import { shallow } from "zustand/shallow";
import { useTodos } from "../store/todos";

function DirectoryModal({
  action,
  directory="",
  open,
  onClose,
}: {
  action: "add" | "edit" | "delete"
  directory: string;
  open: boolean;
  onClose: () => void;
}) {
  const [directoryName, setDirectoryName] = useState(directory);
  const addDirectory = useTodos((state) => state.addDirectory);

  function handleClose() {
    setDirectoryName("");
    onClose();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addDirectory(directoryName);
    handleClose();
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        position="absolute"
        top="50%"
        left="50%"
        bgcolor="background.paper"
        padding="1rem"
        borderRadius={1}
        maxWidth="50rem"
        width="100%"
        sx={{ translate: "-50% -50%" }}
        onSubmit={handleSubmit}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>
            {
              action === "add" 
              ? "Create New Directory"
              : action === "edit"
              ? "Edit This Directory"
              : "Delete This Directory"
            }
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        {
          action === "add" || action === "edit"
          ? (
            <TextField
              fullWidth
              id="Diretory"
              label="Directory Name"
              value={directoryName}
              onChange={(e) => setDirectoryName(e.target.value)}
            />
          ) : (
            <Typography>
              This directory and all the task stored in this will be deleted. 
              Do you wish to delete this directory ?
            </Typography>
          )
        }

        <Box marginTop="1rem">
          <Button
            variant="contained"
            type="submit"
            sx={{ marginRight: "1rem" }}
          >
            {
              action === "add"
              ? "Create"
              : action === "edit"
              ? "Edit"
              : "Delete"
            }
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}

function DirectoriesList() {
  const [directory, setDirectory] = useState(true);
  const [directoryModal, setDirectoryModal] = useState(false);
  const directories = useTodos((state) => state.directories, shallow);

  return (
    <>
      <List>
        <ListItemButton onClick={() => setDirectory((prevState) => !prevState)}>
          <ListItemText primary="Directories" />
          {directory ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={directory} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {directories.map((item, index) => (
              <ListItem
                disablePadding
                key={index}
                sx={{ "&>a": { width: "100%" } }}
                secondaryAction={
                  item !== "Main" ? (
                    <>
                      <IconButton
                        edge="end"
                        aria-label="Edit directory"
                        sx={{ mr: "1rem" }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" aria-label="Delete directory">
                        <Delete />
                      </IconButton>
                    </>
                  ) : null
                }
              >
                <Link to="/directories" key={index}>
                  {item}
                </Link>
              </ListItem>
            ))}
            <ListItemButton
              sx={{
                m: "1rem",
                border: "2px dashed black",
                borderRadius: "2px",
              }}
              onClick={() => setDirectoryModal(true)}
            >
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="New" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <DirectoryModal
        action="add"
        open={directoryModal}
        onClose={() => setDirectoryModal(false)}
      />
    </>
  );
}

function Navbar() {
  return (
    <Box
      position={{ xl: "fixed" }}
      top="0"
      left="0"
      height="100%"
      width={{ xl: "20%" }}
      zIndex={10}
      bgcolor="background.paper"
      sx={{
        overflowY: "auto",
        "& a": {
          textDecoration: "none",
          color: "inherit",
          padding: "1rem 2rem",
        },
        "& a:hover, & a:focus-visible": {
          bgcolor: "#22283180",
        },
        "& a[data-status='active']": {
          bgcolor: "background.default",
          borderRight: "4px solid white",
        },
      }}
    >
      <Typography
        textAlign="center"
        variant="h5"
        fontWeight={700}
        padding="2rem"
      >
        INSTANT TASKS
      </Typography>

      <Box component="nav" display="flex" flexDirection="column" color="white">
        <Link to="/today">Today's Tasks</Link>
        <Link to="/">All Tasks</Link>
        <Link to="/important">Important Tasks</Link>
        <Link to="/completed">Completed Tasks</Link>
        <Link to="/incomplete">Incomplete Tasks</Link>
      </Box>

      <DirectoriesList />
    </Box>
  );
}
export default Navbar;
