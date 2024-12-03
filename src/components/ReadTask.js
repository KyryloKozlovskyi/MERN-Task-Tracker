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

  return (
    <div>
      <h2>This is my Read Component.</h2>
      <Tasks tasks={tasks} />
    </div>
  );
}

export default ReadTask;
