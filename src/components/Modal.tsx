import { useState } from "react";
import { Practice } from "../features/practices/practicesSlice";

interface ModalProps {
  practice: Practice;
  onSave: (response: string) => void;
  onCancel: () => void;
}

const Modal = ({ practice, onSave, onCancel }: ModalProps) => {
  const [response, setResponse] = useState(practice.response);

  const handleSave = () => {
    onSave(response);
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg w-1/3'>
        <h2 className='text-xl font-bold mb-4'>Edit Practice Response</h2>
        <div>
          <label className='block mb-2'>Response</label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className='w-full border p-2 rounded'
            rows={4}
          />
        </div>
        <div className='mt-4'>
          <button
            className='bg-blue-500 text-white p-2 rounded mr-2'
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className='bg-gray-500 text-white p-2 rounded'
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
