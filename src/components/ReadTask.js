import Tasks from "./Tasks";
import { useEffect, useState } from "react";
import axios from "axios";

function ReadTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('https://jsonblob.com/api/jsonblob/1313290558235664384')
      .then((response) => {
        setTasks(response.data.tasks);
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