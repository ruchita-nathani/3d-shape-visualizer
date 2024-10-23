import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

/**
 * Modal component for creating a new shape.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.open - Determines if the modal is open
 * @param {function} props.onClose - Function to call when the modal is closed
 * @param {function} props.onAdd - Function to call when a new shape is added
 * @returns {JSX.Element} The rendered component
 */
const CreateShapeModal = ({ open, onClose, onAdd }) => {
  const [shapeData, setShapeData] = useState({
    name: '',
    type: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    type: false,
  });

  /**
   * Validates the form fields
   * @returns {boolean} Whether the form is valid
   */
  const validateForm = () => {
    const newErrors = {
      name: !shapeData.name.trim(),
      type: !shapeData.type,
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  /**
   * Handles the submission of the form.
   */
  const handleSubmit = () => {
    if (validateForm()) {
        onAdd(shapeData);
        onClose();
        resetForm();
      }
  };

  const resetForm = () => {
    setShapeData({
      name: '',
      type: '',
    });
    setErrors({
      name: false,
      type: false,
    });
  };

  /**
   * Handles the modal close event
   */
  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Shape</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          type="text"
          label="Name"
          value={shapeData.name}
          onChange={(e) =>
            setShapeData({ ...shapeData, name: e.target.value })
          }
          required
          error={errors.name}
          helperText={errors.name ? "Name is required" : ""}
          sx={{ mt: 1 }}
        />
        <FormControl 
          fullWidth 
          sx={{ mt: 2 }} 
          required
          error={errors.type}
        >
          <InputLabel>Shape Type</InputLabel>
          <Select
            value={shapeData.type}
            onChange={(e) =>
              setShapeData({ ...shapeData, type: e.target.value })
            }
            label="Shape Type"
          >
            <MenuItem value="">Select a type</MenuItem>
            <MenuItem value="sphere">Sphere</MenuItem>
            <MenuItem value="cube">Cube</MenuItem>
            <MenuItem value="cylinder">Cylinder</MenuItem>
            <MenuItem value="cone">Cone</MenuItem>
          </Select>
          {errors.type && (
            <FormHelperText>Shape type is required</FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateShapeModal;