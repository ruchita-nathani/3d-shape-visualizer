import React from 'react';
import { Dialog, IconButton, Paper, AppBar, Toolbar } from '@mui/material';
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
    <Dialog fullScreen open={open} onClose={onClose} aria-labelledby="shape-render-dialog">
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton color="inherit" onClick={onClose} aria-label="close">
            <X size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Paper
        sx={{
          height: '100%',
          width: '100%',
          bgcolor: 'white',
          overflow: 'hidden',
        }}
      >
        <ShapeCanvas shapes={shapesToRender} />
      </Paper>
    </Dialog>
  );
};

export default ShapeRender;