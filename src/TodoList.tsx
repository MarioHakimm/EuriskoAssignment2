import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheck,
  faTimes,
  faSpinner,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Tabs,
  Tab,
  CircularProgress,
  Box,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

interface Item {
  id: number;
  text: string;
  completed: boolean;
}

const RedTrashIcon = styled(FontAwesomeIcon)({
  cursor: "pointer",
  marginLeft: "0.5rem",
  "&:hover": {
    color: "red",
  },
});

const CenteredSpinner = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const TabPanel: React.FC<{ value: string; index: string }> = ({
  value,
  index,
  children,
}) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>([
    { id: 1, text: "Learn Typescript", completed: false },
    { id: 2, text: "Build Todo List App", completed: true },
  ]);

  const [input, setInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("active");
  const [loading, setLoading] = useState<boolean>(false);
  const [createInput, setCreateInput] = useState<string>("");
  const [isCreateDisabled, setIsCreateDisabled] = useState<boolean>(true);

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleUncheck = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: false };
        }
        return todo;
      })
    );
  };

  const handleMoveToCompleted = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      })
    );
  };

  const handleClick = () => {
    const newTodo: Item = { id: Date.now(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleTabChange = (newValue: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveTab(newValue);
    }, 1000);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateInput(event.target.value);
    setIsCreateDisabled(event.target.value === "");
  };

  const handleCreate = () => {
    if (!isCreateDisabled) {
      const newTodo: Item = {
        id: Date.now(),
        text: createInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setCreateInput("");
      setIsCreateDisabled(true);
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="main-container bg-alice-blue">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center charcoal-gray">
        My Task Management App
      </h1>
      <Tabs value={activeTab} onChange={(_, value) => handleTabChange(value)}>
        <Tab label="Active" value="active" />
        <Tab label="Completed" value="completed" />
      </Tabs>
      <TabPanel value={activeTab} index="active">
        {loading && <CenteredSpinner />}
        <>
          <Box marginBottom="1rem" display="flex" alignItems="center">
            <TextField
              placeholder="Enter task"
              value={createInput}
              onChange={handleInputChange}
            />
            <IconButton
              onClick={handleCreate}
              disabled={isCreateDisabled}
              sx={{
                marginLeft: "0.5rem",
                "&:hover": {
                  color: "green",
                  bgcolor: "alice-blue",
                },
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          </Box>
          {activeTodos.length === 0 && (
            <Typography className="font-comfortaa">No Active tasks.</Typography>
          )}
          <ul>
            {activeTodos.map((todo) => (
              <li key={todo.id}>
                <span
                  onClick={() => handleToggle(todo.id)}
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {todo.text}
                </span>
                {!todo.completed && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    onClick={() => handleMoveToCompleted(todo.id)}
                    style={{
                      cursor: "pointer",
                      marginLeft: "0.5rem",
                      color: "green",
                      "&:hover": {
                        color: "green",
                      },
                    }}
                  />
                )}
                <RedTrashIcon
                  icon={faTrash}
                  onClick={() => handleDelete(todo.id)}
                />
              </li>
            ))}
          </ul>
        </>
      </TabPanel>
      <TabPanel value={activeTab} index="completed">
        {loading && <CenteredSpinner />}
        {completedTodos.length === 0 ? (
          <Typography>No Completed tasks.</Typography>
        ) : (
          <ul>
            {completedTodos.map((todo) => (
              <li key={todo.id}>
                <span>{todo.text}</span>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleUncheck(todo.id)}
                  style={{
                    cursor: "pointer",
                    marginLeft: "0.5rem",
                    color: "red",
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </TabPanel>
    </div>
  );
};
