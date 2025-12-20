import React from "react";
import { MultipleContainers } from "./MultipleContainers";
import { rectSortingStrategy } from "@dnd-kit/sortable";

const TodoList = () => {
  return (
    <div>
      <MultipleContainers
        itemCount={5}
        strategy={rectSortingStrategy}
        vertical
      />
    </div>
  );
};

export default TodoList;
