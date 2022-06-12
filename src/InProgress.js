import React from "react";
import Card from "./Card";

export default function InProgress({ tasks, addTask }) {
  return (
    <>
      {tasks
        .filter((item) => item.timeline === "inprogress")
        .map((e, index) => (
          <Card key={index} currentTask={e} tasks={tasks} addTask={addTask} />
        ))}
    </>
  );
}