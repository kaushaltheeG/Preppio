import React, { useState } from 'react';
import GoogleDriveService from '../services/GoogleDriveService';

const YourComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCreateDoc = async () => {
    try {
      const result = await GoogleDriveService.insertGoogleDoc(params);
      setShowModal(true); // Show modal after successful doc creation
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default YourComponent; 