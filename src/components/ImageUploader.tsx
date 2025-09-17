import React, { useCallback, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { uploadImageToCloudinary } from '../config/cloudinary';

interface ImageUploaderProps {
  onFileSelect?: (file: File) => void;
  onImageUpload?: (imageUrl: string) => void;
  onFileRemove?: () => void;
  currentImageUrl?: string;
  title: string;
  description: string;
  dimensions: string;
  maxSize: string;
  supportedFormats: string;
  aspectRatio?: string;
  isLoading?: boolean;
  autoUpload?: boolean;
  folder?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFileSelect,
  onImageUpload,
  onFileRemove,
  currentImageUrl,
  title,
  description,
  dimensions,
  maxSize,
  supportedFormats,
  aspectRatio = '1:1',
  isLoading = false,
  autoUpload = true,
  folder = 'bluestock',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);


  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Call onFileSelect if provided (for non-auto upload)
      if (onFileSelect) {
        onFileSelect(file);
      }
      
      // Auto upload to Cloudinary if enabled
      if (autoUpload && onImageUpload) {
        setIsUploading(true);
        setUploadError(null);
        
        try {
          const imageUrl = await uploadImageToCloudinary(file, folder);
          onImageUpload(imageUrl);
        } catch (error) {
          console.error('Upload error:', error);
          setUploadError('Failed to upload image. Please try again.');
        } finally {
          setIsUploading(false);
        }
      }
    }
  }, [onFileSelect, onImageUpload, autoUpload, folder]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      
      // Call onFileSelect if provided (for non-auto upload)
      if (onFileSelect) {
        onFileSelect(file);
      }
      
      // Auto upload to Cloudinary if enabled
      if (autoUpload && onImageUpload) {
        setIsUploading(true);
        setUploadError(null);
        
        try {
          const imageUrl = await uploadImageToCloudinary(file, folder);
          onImageUpload(imageUrl);
        } catch (error) {
          console.error('Upload error:', error);
          setUploadError('Failed to upload image. Please try again.');
        } finally {
          setIsUploading(false);
        }
      }
    }
  }, [onFileSelect, onImageUpload, autoUpload, folder]);

  const getAspectRatioStyle = () => {
    const [_width, _height] = aspectRatio.split(':').map(Number);
    return {
      aspectRatio: aspectRatio,
      width: '100%',
    };
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <Paper
        elevation={isDragOver ? 8 : 2}
        sx={{
          border: '2px dashed',
          borderColor: isDragOver ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
          ...getAspectRatioStyle(),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`file-input-${title}`)?.click()}
      >
        {currentImageUrl ? (
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={currentImageUrl}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            {onFileRemove && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onFileRemove();
                }}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'error.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'error.dark',
                  },
                }}
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box>
            {isLoading || isUploading ? (
              <CircularProgress size={40} />
            ) : (
              <CloudUploadIcon sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
            )}
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {isUploading ? 'Uploading...' : description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dimensions} • {supportedFormats} • {maxSize}
            </Typography>
          </Box>
        )}
        
        <input
          id={`file-input-${title}`}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </Paper>
      
      {uploadError && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {uploadError}
        </Alert>
      )}
    </Box>
  );
};

export default ImageUploader;
