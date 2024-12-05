import Tasks from "./Tasks";
import { useEffect, useState } from "react";
import axios from "axios";

function ReadTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const Reload = () => {
    console.log("Reloading task data...");
    axios
      .get("http://localhost:4000/api/tasks ")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error reloading data:", error);
      });
  };

  return (
    <div>
      <h2>This is my Read Component.</h2>
      <Tasks tasks={tasks} ReloadData={Reload}x />
    </div>
  );
}

export default ReadTask;
