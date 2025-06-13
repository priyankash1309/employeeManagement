import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<Omit<Employee, 'id'>>({ name: '', email: '', department: '', salary: 0 });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchEmployees = async () => {
    const res = await fetch('http://localhost:4000/employees');
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => { fetchEmployees(); }, []);

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `http://localhost:4000/employees/${editId}` : 'http://localhost:4000/employees';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      toast.success(`Employee ${editId ? 'updated' : 'added'} successfully!`);
      setForm({ name: '', email: '', department: '', salary: 0 });
      setEditId(null);
      fetchEmployees();
    } else {
      toast.error('Something went wrong.');
    }
  };

  const handleDelete = (id: number) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col space-y-2">
          <span className="text-sm">Are you sure you want to delete this employee?</span>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => closeToast()}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                const res = await fetch(`http://localhost:4000/employees/${id}`, { method: 'DELETE' });
                closeToast(); // Close immediately
                if (res.ok) {
                  toast.success('Employee deleted successfully!');
                  fetchEmployees();
                } else {
                  toast.error('Failed to delete employee.');
                }
              }}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      ),
      {
        closeOnClick: false,
        closeButton: false,
        autoClose: false,
      }
    );
  };

  const handleEdit = (employee: Employee) => {
    setForm(employee);
    setEditId(employee.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Employee Management</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <input
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
            placeholder="Department"
            required
          />
          <input
            type="number"
            min="0"
            className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={form.salary === 0 ? '' : form.salary}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val) && val >= 0) {
                setForm({ ...form, salary: val });
              }
            }}
            onFocus={(e) => {
              if (form.salary === 0) {
                e.target.select();
              }
            }}
            placeholder="Salary"
            required
          />
          <div className="md:col-span-2 flex gap-4 justify-end mt-2">
            <button
              type="reset"
              onClick={() => {
                setForm({ name: '', email: '', department: '', salary: 0 });
                setEditId(null);
              }}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition"
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            >
              {editId ? 'Update' : 'Add'} Employee
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
            <thead className="text-xs uppercase bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-blue-50">
                  <td className="px-6 py-3 font-medium">{emp.name}</td>
                  <td className="px-6 py-3">{emp.email}</td>
                  <td className="px-6 py-3">{emp.department}</td>
                  <td className="px-6 py-3">₹{emp.salary.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center px-6 py-4 text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
