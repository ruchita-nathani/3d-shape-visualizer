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

/**
 * Component for displaying a table of shapes.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.shapes - Array of shape objects to display
 * @param {function} props.onDeleteShape - Function to call when deleting a shape
 * @returns {JSX.Element} The rendered component
 */
const ShapeTable = ({ shapes, onDeleteShape }) => {
  return (
    <>
    <TableContainer>
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shapes.map((shape) => (
            <TableRow key={shape.id}>
                <TableCell>{shape.id}</TableCell>
                <TableCell>{shape.name}</TableCell>
              
              <TableCell>
    <Button
        variant="contained"
        color="error"
        onClick={() => onDeleteShape(shape.id)}
        sx={{ m: 1 }}
      >
        Delete
    </Button>
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