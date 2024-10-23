import React, { useState } from 'react';
import { Box, Container, Button } from '@mui/material';
import ShapeTable from './components/ShapeTable';
import CreateShapeModal from './components/CreateShapeModal';

/**
 * Main application component.
 *
 * @component
 * @returns {JSX.Element} The rendered component
 */
const App = () => {
  const [shapes, setShapes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);

  /**
   * Handles adding a new shape.
   *
   * @param {Object} newShape - The new shape to add
   */
  const handleAddShape = (newShape) => {
    setShapes([...shapes, { ...newShape, id: Date.now() }]);
  };

  /**
   * Handles updating an existing shape.
   *
   * @param {number} id - The ID of the shape to update
   * @param {Object} updates - The updates to apply to the shape
   */
  const handleUpdateShape = (id, updates) => {
    setShapes(shapes.map(shape => 
      shape.id === id ? { ...shape, ...updates } : shape
    ));
  };

  /**
   * Handles deleting a shape.
   *
   * @param {number} id - The ID of the shape to delete
   */
  const handleDeleteShape = (id) => {
    setShapes(shapes.filter(shape => shape.id !== id));
  };


  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
        sx={{ m: 1 }}
      >
        Create
    </Button>
        <ShapeTable 
          shapes={shapes} 
          onAddShape={() => setIsModalOpen(true)}
          onDeleteShape={handleDeleteShape}
        />
        <CreateShapeModal 
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddShape}
        />
      </Box>
    </Container>
  );
};

export default App;