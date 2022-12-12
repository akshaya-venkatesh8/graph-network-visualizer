import { useTheme } from "@emotion/react";
import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import { useEdges, useStore } from "reactflow";

const nodesLengthSelector = (state) =>
  Array.from(state.nodeInternals.values()).length || 0;
export default function InfoDialog(props) {
  const { onClose, open } = props;
  const theme = useTheme();
  const nodesLength = useStore(nodesLengthSelector);
  const edges = useEdges();
  const textStyle = {
    color: theme.palette.text.secondary,
    margin: "0.25rem auto",
  };
  const getMatrix = () => {
    let adjMatrix = Array(nodesLength)
      .fill()
      .map(() => Array(nodesLength).fill(0));
    edges.forEach((e) => {
      //adj matrix calculation
      adjMatrix[e.source - 1][e.target - 1] = 1;
      adjMatrix[e.target - 1][e.source - 1] = 1;
    });
    let rows = [];
    adjMatrix.forEach((row) => {
      rows.push(row);
    });
    return rows;
  };
  const handleClose = () => {
    onClose();
  };

  // This function returns true if
  // graph G[V][V] is Bipartite, else false
  const isBipartite = (G, src) => {
    if (!(G.length > 0)) {
      return "test";
    }
    // Create a color array to store
    // colors assigned to all vertices.
    // Vertex number is used as index
    // in this array. The value '-1'
    // of colorArr[i] is used to indicate
    // that no color is assigned
    // to vertex 'i'. The value 1 is
    // used to indicate first color
    // is assigned and value 0 indicates
    // second color is assigned.
    let colorArr = new Array(nodesLength);
    for (let i = 0; i < nodesLength; ++i) colorArr[i] = -1;

    // Assign first color to source
    colorArr[src] = 1;

    // Create a queue (FIFO) of vertex numbers
    // and enqueue source vertex for BFS traversal
    let q = [];
    q.push(src);

    // Run while there are vertices in queue (Similar to BFS)
    while (q.length !== 0) {
      // Dequeue a vertex from queue
      let u = q.shift();

      // Return false if there is a self-loop
      if (G[u][u] === 1) return false;

      // Find all non-colored adjacent vertices
      for (let v = 0; v < nodesLength; ++v) {
        // An edge from u to v exists
        // and destination v is not colored
        if (G[u][v] === 1 && colorArr[v] === -1) {
          // Assign alternate color to this adjacent v of u
          colorArr[v] = 1 - colorArr[u];
          q.push(v);
        }

        // An edge from u to v exists and destination
        //  v is colored with same color as u
        else if (G[u][v] === 1 && colorArr[v] === colorArr[u]) return false;
      }
    }
    // If we reach here, then all adjacent vertices can
    // be colored with alternate color
    return true;
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Graph Information</DialogTitle>
      <div style={textStyle}>
        <div>
          {getMatrix().map((row, i) => (
            <div style={textStyle} key={i}>
              {row.map((col, j) => (
                <span style={textStyle} className="cell" key={j}>
                  {col}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div style={textStyle} className="bipartite">{`${isBipartite(
          getMatrix(),
          0
        )}`}</div>
      </div>
    </Dialog>
  );
}
