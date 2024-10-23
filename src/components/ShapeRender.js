import React from 'react';
import { Box, Modal, IconButton, Paper } from '@mui/material';
import { X } from 'lucide-react';
import ShapeCanvas from './ShapeCanvas';

/**
 * Component for rendering shapes in a modal.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Determines if the modal is open
 * @param {function} props.onClose - Function to call when the modal is closed
 * @param {Object|Object[]} props.shapes - Single shape or array of shapes to render
 * @returns {JSX.Element} The rendered component
 */
const ShapeRender = ({ 
  open, 
  onClose, 
  shapes,   
}) => {
  // Convert single shape to array if needed
  const shapesToRender = Array.isArray(shapes) ? shapes : [shapes];
  console.log(shapesToRender);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '1000px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="shape-render-modal"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <X size={24} />
          </IconButton>
        </Box>
        <Paper 
          sx={{ 
            height: '600px', 
            width: '100%',
            bgcolor: 'white',
            overflow: 'hidden'
          }}
        >
          <ShapeCanvas 
            shapes={shapesToRender}
          />
        </Paper>
      </Box>
    </Modal>
  );
};

export default ShapeRender;