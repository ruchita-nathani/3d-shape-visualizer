import React, { useState } from 'react';
import { Box, Container, Button } from '@mui/material';
import ShapeTable from './components/ShapeTable';
import CreateShapeModal from './components/CreateShapeModal';
import ShapeRender from './components/ShapeRender';

/**
 * Main application component.
 *
 * @component
 * @returns {JSX.Element} The rendered component
 */
const App = () => {
  const [shapes, setShapes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);

  /**
   * Handles adding a new shape.
   *
   * @param {Object} newShape - The new shape to add
   */
  const handleAddShape = (newShape) => {
    setShapes(prevShapes => [...prevShapes, { ...newShape, id: prevShapes.length + 1 }]);
  };

  /**
   * Handles deleting a shape.
   *
   * @param {number} id - The ID of the shape to delete
   */
  const handleDeleteShape = (id) => {
    setShapes(shapes.filter(shape => shape.id !== id));
  };

  /**
   * Handles rendering all shapes.
   */
  const handleRenderAll = () => {
    setSelectedShape(null); 
    setIsRenderModalOpen(true);
  };

  /**
   * Handles rendering a single shape.
   *
   * @param {Object} shape - The shape to render
   */
  const handleRenderSingle = (shape) => {
    setSelectedShape(shape);
    setIsRenderModalOpen(true);
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
    <Button
        variant="contained"
        color="primary"
        onClick={handleRenderAll}
        sx={{ m: 1 }}
      >
        Render
    </Button>
        <ShapeTable 
          shapes={shapes} 
          onAddShape={() => setIsModalOpen(true)}
          onDeleteShape={handleDeleteShape}
          onRenderShape={handleRenderSingle}
        />
        <CreateShapeModal 
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddShape}
        />
        <ShapeRender 
          open={isRenderModalOpen}
          onClose={() => setIsRenderModalOpen(false)}
          shapes={selectedShape ? [selectedShape] : shapes}
        />
      </Box>
    </Container>
  );
};

export default App;