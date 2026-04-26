import React from 'react';
import Modal from './Modal';
import Button from './Button';

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Are you sure?', 
  message = 'This action cannot be undone.', 
  confirmLabel = 'Confirm', 
  confirmVariant = 'primary',
  loading = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-6">
        <p className="text-sm text-zinc-600 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-3">
          <Button 
            variant="secondary" 
            onClick={onClose} 
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            variant={confirmVariant} 
            onClick={onConfirm} 
            loading={loading}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
