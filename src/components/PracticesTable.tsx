import { Practice } from "../features/practices/practicesSlice";

interface PracticesTableProps {
  practices: Practice[];
  onEdit: (practice: Practice) => void;
}

const PracticesTable = ({ practices, onEdit }: PracticesTableProps) => {
  return (
    <table className='min-w-full mt-4 border-collapse'>
      <thead>
        <tr>
          <th className='border p-2'>Practice ID</th>
          <th className='border p-2'>Category</th>
          <th className='border p-2'>Status</th>
          <th className='border p-2'>Response</th>
          <th className='border p-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {practices.map((practice) => (
          <tr key={practice.practiceId}>
            <td className='border p-2'>{practice.practiceId}</td>
            <td className='border p-2'>{practice.category}</td>
            <td className='border p-2'>{practice.status}</td>
            <td className='border p-2'>{practice.response}</td>
            <td className='border p-2'>
              <button
                className='bg-blue-500 text-white p-2 rounded'
                onClick={() => onEdit(practice)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PracticesTable;
