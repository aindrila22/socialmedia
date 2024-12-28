import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteModal = ({ isOpen, onClose, onDelete }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-end space-x-2">
        <Button onClick={onClose} className="px-4 py-2 bg-gray-300 text-sm">
          Cancel
        </Button>
        <Button onClick={onDelete} className="px-4 py-2 bg-red-500 text-sm text-white">
          Confirm
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export const EditModal = ({ isOpen, onClose, content, onContentChange, onSave }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogDescription>Write your post below</DialogDescription>
      </DialogHeader>
      <form className="space-y-4" onSubmit={onSave}>
        <textarea
          rows="4"
          value={content}
          onChange={onContentChange}
          maxLength="250"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter post content"
        />
        <div className="text-sm text-gray-500 mt-1">
          {content.length}/250 characters
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} className="px-4 py-2 bg-gray-300 text-sm">
            Cancel
          </Button>
          <Button type="submit" className="px-4 py-2 bg-green-500 text-sm text-white">
            Save
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
);

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};