import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

/**
 * Component for displaying a table of shapes.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.shapes - Array of shape objects to display
 * @param {function} props.onDeleteShape - Function to call when deleting a shape
 * @param {function} props.onRenderShape - Function to call when rendering a shape
 * @returns {JSX.Element} The rendered component
 */
const ShapeTable = ({ shapes, onDeleteShape, onRenderShape }) => {
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Shape Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shapes.map((shape) => (
              <TableRow key={shape.id} hover role="checkbox" tabIndex={-1}>
                <TableCell>{shape.id}</TableCell>
                <TableCell>{shape.name}</TableCell>
                <TableCell>{shape.type}</TableCell>

                <TableCell>
                  <Tooltip
                    title={`Render ${shape.name}`}
                    TransitionComponent={Zoom}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onRenderShape(shape)}
                      sx={{ m: 1 }}
                    >
                      Render
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title={`Delete ${shape.name}`}
                    TransitionComponent={Zoom}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => onDeleteShape(shape.id)}
                      sx={{ m: 1 }}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShapeTable;
