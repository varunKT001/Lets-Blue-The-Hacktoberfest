import { useState } from 'react'
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';

// custom hooks
import useLocalStorage from './hooks/useLocalStorage'

// custom components
import CustomForm from './components/CustomForm'
import EditForm from './components/EditForm'
import TaskList from './components/TaskList'

function App() {
  const [theme, setTheme] = useState("light")
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mode, setMode] = useState('light');

  const toggler = () => {
    theme == "light" ? setTheme("dark") : setTheme("light")
  }

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }


  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  }

  const deleteTask = (id) => {
    setTasks(current =>
      current.filter(item => {
        return item.id !== id;
      }),
    );
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name }
        : t
    )))
    closeEditMode();
  }


  document.body.style = theme === "dark" && 'background: #9a999f;';

  return (
    <div className="container" id={theme}>
      <header>
        <h1>Today</h1>

        <div style={{marginTop: "25px"}}>
      <DarkModeToggle
        mode={mode}
        dark="Dark"
        light="Light"
        size="md"
        inactiveTrackColor="#fcfcfd"
        inactiveTrackColorOnHover="#f8fafc"
        inactiveTrackColorOnActive="#cbd5e1"
        activeTrackColor="#334155"
        activeTrackColorOnHover="#1e293b"
        activeTrackColorOnActive="#0f172a"
        inactiveThumbColor="#1e293b"
        activeThumbColor="#e2e8f0"
        onChange={(mode) => {
          setMode(mode);
          toggler()
        }}
      />
      </div>
      </header>

      

      <CustomForm addTask={addTask} />

     <q> An app for managing your daily tasks.You can add, delete and edit your To-do list. </q>

      <CustomForm addTask={addTask}/>

      {tasks && (
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}

          deleteTask={deleteTask}
        />
      )}


        />
      )}
        <footer>
          <ul>
      <li> <a href="https://www.bluelearn.in/"><img src= "src/assets/bluelearn-icon.svg" height="20" width="50"></img>Website</a></li>
      <li> <a href="https://www.instagram.com/bluelearn.in/"> <img src= "src/assets/instagram-icon.svg" height="20" width="50"></img>Instagram</a></li>
      <li> <a href="https://www.linkedin.com/company/bluelearn"><img src= "src/assets/linkedin-icon.svg" height="20" width="50"></img>Linkedin</a></li>
      <li> <a href="https://www.youtube.com/channel/UCSuCYJ_jvzVJYFycR4WIZhw"><img src= "src/assets/youtube-icon.svg" height="20" width="50"></img>Youtube</a></li>

        </ul>
        </footer>


    </div>
  )
}

export default App
