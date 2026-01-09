// JointJSDemo.tsx
import React, { useEffect, useRef } from "react";
import * as joint from "jointjs";
import "jointjs/dist/joint.min.css";

const TestDiagram: React.FC = () => {
  const paperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paperRef.current) return;

    // 1. Tạo graph
    const graph = new joint.dia.Graph();

    // 2. Tạo paper
    const paper = new joint.dia.Paper({
      el: paperRef.current,
      model: graph,
      width: 800,
      height: 400,
      gridSize: 10,
      drawGrid: true,
    });

    // 3. Tạo hình chữ nhật 1
    const rect1 = new joint.shapes.standard.Rectangle();
    rect1.position(100, 100);
    rect1.resize(100, 40);
    rect1.attr({
      body: {
        fill: "lightblue",
        stroke: "black",
      },
      label: {
        text: "Rect 1",
        fill: "black",
      },
    });
    rect1.addTo(graph);

    // 4. Tạo hình chữ nhật 2
    const rect2 = new joint.shapes.standard.Rectangle();
    rect2.position(400, 200);
    rect2.resize(100, 40);
    rect2.attr({
      body: {
        fill: "lightgreen",
        stroke: "black",
      },
      label: {
        text: "Rect 2",
        fill: "black",
      },
    });
    rect2.addTo(graph);

    // 5. Tạo link nối 2 hình chữ nhật
    const link = new joint.shapes.standard.Link();
    link.source(rect1);
    link.target(rect2);
    link.addTo(graph);

    // Cleanup khi component unmount
    return () => {
      paper.remove();
    };
  }, []);

  return (
    <div>
      <h1>Test Diagramm</h1>
      <div ref={paperRef} style={{ border: "1px solid #ccc", width: 800, height: 400 }} />
    </div>
  )
};

export default TestDiagram;
