import React from 'react';
import { Dialog, IconButton, Paper } from '@mui/material';
import { X } from 'lucide-react';
import ShapeCanvas from './ShapeCanvas';

/**
 * Component for rendering shapes in a full-screen dialog.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Determines if the dialog is open
 * @param {function} props.onClose - Function to call when the dialog is closed
 * @param {Object|Object[]} props.shapes - Single shape or array of shapes to render
 * @returns {JSX.Element} The rendered component
 */
const ShapeRender = ({ open, onClose, shapes }) => {
  // Convert single shape to array if needed
  const shapesToRender = Array.isArray(shapes) ? shapes : [shapes];

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="shape-render-dialog"
    >
      {/* paper for the shape canvas */}
      <Paper
        sx={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* close button */}
        <IconButton
          color="primary"
          onClick={onClose}
          aria-label="close"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <X size={24} />
        </IconButton>

        {/* shape canvas */}
        <ShapeCanvas shapes={shapesToRender} />
      </Paper>
    </Dialog>
  );
};

export default ShapeRender;
