import dayjs from "dayjs";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface TodosProps {
  id: string;
  title: string;
  description: string;
  directory: string;
  date: string;
  completed: boolean;
  important: boolean;
}

interface TodosSortAndOrderProps {
  order: "list" | "grid";
  setOrder: (order: "list" | "grid") => void;
}

interface TodosSlice {
  todos: Record<string, TodosProps>;
}

interface DirectoriesSlice {
  directories: string[];
  addDirectory: (directory: string) => void;
  // editDirectory: ({oldDirectoryName, newDirectoryName}: {oldDirectoryName: string, newDirectoryName: string}) => void;
  // deleteDirectory: (directory: string) => void;
}

const uniqueID1 = crypto.randomUUID();
const uniqueID2 = crypto.randomUUID();
const uniqueID3 = crypto.randomUUID();

const initialTodos: Record<string, TodosProps> = {
  [uniqueID1]: {
    id: uniqueID1,
    title: "Task 1",
    description: "This is description for this task",
    directory: "Main",
    date: dayjs().format("DD-MM-YYYY"),
    completed: true,
    important: true,
  },
  [uniqueID2]: {
    id: uniqueID2,
    title: "Task 2",
    description: "This is description for this task",
    directory: "Main",
    date: dayjs().add(1, "day").format("DD-MM-YYYY"),
    completed: true,
    important: false,
  },
  [uniqueID3]: {
    id: uniqueID3,
    title: "Task 3",
    description: "This is description for this task",
    directory: "Main",
    date: dayjs().add(2, "day").format("DD-MM-YYYY"),
    completed: false,
    important: false,
  },
};

const createTodosSlice: StateCreator<
  TodosSlice & DirectoriesSlice,
  [["zustand/immer", never], ["zustand/persist", Partial<TodosSlice>], never],
  [],
  TodosSlice
> = (set, get) => ({
  todos: initialTodos,
});

const createDirectoriesSlice: StateCreator<
  TodosSlice & DirectoriesSlice,
  [],
  [],
  DirectoriesSlice
> = (set, get) => ({
  directories: ["Main"],

  addDirectory(directory) {
    set({ directories: [...get().directories, directory] });
  },

  // editDirectory({oldDirectoryName, newDirectoryName}) {
  //   const index = get().directories.indexOf(oldDirectoryName)
  //   if(index !== -1)
  //   set((state) => {
  //     state.directories[index] = newDirectoryName
  //     for(const key in state.todos) {
  //       if(state.todos[key].directory === oldDirectoryName)
  //       state.todos[key].directory = newDirectoryName
  //     }
  //   })
  // },

  // deleteDirectory(directory) {
  //   set((state) => {

  //   })
  // }
});

export const useTodos = create<TodosSlice & DirectoriesSlice>()(
  immer(
    persist(
      (...a) => ({
        ...createTodosSlice(...a),
        ...createDirectoriesSlice(...a),
      }),
      {
        name: "instant-tasks",
      }
    )
  )
);

export const useTodosSortAndOrder = create<TodosSortAndOrderProps>()((set) => ({
  order: "grid",
  setOrder: (order) => set({ order }),
}));
