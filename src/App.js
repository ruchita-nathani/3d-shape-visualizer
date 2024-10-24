import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ShapeTable from './components/ShapeTable';
import CreateShapeModal from './components/CreateShapeModal';
import ShapeRender from './components/ShapeRender';
import Zoom from '@mui/material/Zoom';
import { Box } from '@mui/material';

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
  const [maxId, setMaxId] = useState(0);

  // Key for localStorage
  const SHAPE_STORAGE_KEY = 'shapesData';
  const MAX_ID_STORAGE_KEY = 'maxId';

  /**
   * Handles loading shapes from local storage on component mount.
   */
  useEffect(() => {
    const savedMaxId= localStorage.getItem(MAX_ID_STORAGE_KEY)
    if (savedMaxId) {
      setMaxId(parseInt(savedMaxId));
    }
    const savedShapes = localStorage.getItem(SHAPE_STORAGE_KEY);  
    if (savedShapes) {
      setShapes(JSON.parse(savedShapes));
    }
  }, []); // Runs only once when the component mounts

  /**
   * Handles saving shapes to local storage whenever the shapes state changes.
   */
  useEffect(() => {
    if (shapes.length > 0) {
      localStorage.setItem(SHAPE_STORAGE_KEY, JSON.stringify(shapes));
    }
    else {
      localStorage.removeItem(SHAPE_STORAGE_KEY);
    }
  }, [shapes]); // Runs every time the shapes state changes

  /**
   * Handles adding a new shape and saving to localStorage.
   *
   * @param {Object} newShape - The new shape to add
   */
  const handleAddShape = (newShape) => {
    setShapes((prevShapes) => [
      ...prevShapes,
      { ...newShape, id: maxId + 1 },
    ]);
    
    localStorage.setItem(MAX_ID_STORAGE_KEY, maxId + 1);
    setMaxId(maxId + 1);
  };

  /**
   * Handles deleting a shape.
   *
   * @param {number} id - The ID of the shape to delete
   */
  const handleDeleteShape = (id) => {
    setShapes(shapes.filter((shape) => shape.id !== id));
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
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box sx={{ width: '80%', margin: 'auto' }}>
        <h1>3D Shape Visualizer</h1>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Tooltip TransitionComponent={Zoom} title="Create Shape">
            <span>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
                sx={{ m: 1 }}
              >
                Create
              </Button>
            </span>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title="Render All Shapes">
            <span>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRenderAll}
                sx={{ m: 1 }}
                disabled={shapes.length === 0}
              >
                Render
              </Button>
            </span>
          </Tooltip>
        </Box>
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
