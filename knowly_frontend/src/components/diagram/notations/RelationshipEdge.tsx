import React from "react";
import { BaseEdge, getSmoothStepPath } from "@xyflow/react";

const RelationshipEdge = (props) => {
  const getMarker = (type: string, optional: boolean) => {
    if (type != "one" && type != "many") {
      return;
    }

    let edgeType = "";
    if (type === "one" && optional) {
      edgeType = "url(#one-optional)";
    } else if (type === "one" && !optional) {
      edgeType = "url(#one-mandatory)";
    } else if (type === "many" && optional) {
      edgeType = "url(#many-optional)";
    } else {
      edgeType = "url(#many-mandatory)";
    }

    return edgeType;
  };

  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
  } = props;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const markerStart = getMarker(data.start, data.optionalStart);
  const markerEnd = getMarker(data.end, data.optionalEnd);
  return (
    <BaseEdge
      id={id}
      path={edgePath}
      markerStart={markerStart}
      markerEnd={markerEnd}
    />
  );
};

export default RelationshipEdge;
