import { useState } from "react";
import { useAppSelector } from "./hooks/useAppSelector";
import { useAppDispatch } from "./hooks/useAppDispatch";
import {
  selectAllPractices,
  selectPracticesStatus,
  selectPracticesError,
} from "./features/practices/practicesSelector";
import {
  updatePractice,
  fetchPractices,
} from "./features/practices/practicesSlice";
import PracticesTable from "./components/PracticesTable";
import { Practice } from "./features/practices/practicesSlice";
import Modal from "./components/Modal";
import { signOut } from "aws-amplify/auth";

function App() {
  const [clientId, setClientId] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [editingPractice, setEditingPractice] = useState<Practice | null>(null);

  const dispatch = useAppDispatch();
  const practices = useAppSelector(selectAllPractices);
  const status = useAppSelector(selectPracticesStatus);
  const error = useAppSelector(selectPracticesError);

  const handleFetchPractices = () => {
    if (clientId) {
      dispatch(fetchPractices(clientId));
    }
  };

  const handleEdit = (practice: Practice) => {
    setEditingPractice(practice);
    setShowModal(true);
  };

  const handleSave = async (updatedResponse: string) => {
    if (editingPractice) {
      const updatedPractice = { ...editingPractice, response: updatedResponse };
      await dispatch(updatePractice(updatedPractice));
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingPractice(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Practices</h1>

      {/* Sign Out Button */}
      <button
        className='bg-red-500 text-white p-2 rounded mb-4'
        onClick={handleSignOut}
      >
        Sign Out
      </button>

      {/* Client ID Textbox */}
      <div className='mb-4'>
        <label className='block mb-2'>Client ID</label>
        <input
          type='text'
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          className='w-full border p-2 rounded'
          placeholder='Enter Client ID'
        />
      </div>

      {/* Fetch Practices Button */}
      <button
        className='bg-blue-500 text-white p-2 rounded mb-4'
        onClick={handleFetchPractices}
      >
        Fetch Practices
      </button>

      {/* Loading and Error States */}
      {status === "loading" && <p>Loading practices...</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}

      {/* Practices Table */}
      {practices.length > 0 && (
        <PracticesTable practices={practices} onEdit={handleEdit} />
      )}

      {/* Modal for editing a practice */}
      {showModal && editingPractice && (
        <Modal
          practice={editingPractice}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default App;
