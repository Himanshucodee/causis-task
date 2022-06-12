import React from "react";

export default function Header({ handleSubmit }) {
  return (
    <div className='header'>
      <button onClick={handleSubmit} className='addButton'>
        Add Task
      </button>
      <p>What went well</p>
      <p>What didn't went well</p>
    </div>
  );
}