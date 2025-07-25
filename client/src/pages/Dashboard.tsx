import React, { useEffect, useState } from "react";
import { FaSchool, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface School {
  id: number;
  name: string;
  address: string;
  phone: string;
}

const SchoolDashboard: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [form, setForm] = useState<Partial<School>>({});
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch schools
  const fetchSchools = async () => {
    const res = await fetch("http://127.0.0.1:8000/school/");
    const data = await res.json();
    setSchools(data);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  // Add or update school
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/schools/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({});
    setEditingId(null);
    fetchSchools();
  };

  // Delete school
  const handleDelete = async (id: number) => {
    await fetch(`/api/schools/${id}`, { method: "DELETE" });
    fetchSchools();
  };

  // Edit school
  const handleEdit = (school: School) => {
    setForm(school);
    setEditingId(school.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <FaSchool size={40} className="text-blue-400 drop-shadow" />
          <h1 className="text-3xl font-bold text-white">Quản lý trường học</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white/90 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Tên trường"
            value={form.name || ""}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="border-2 border-blue-300 p-3 rounded-lg w-full md:w-1/4 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            value={form.address || ""}
            onChange={e => setForm({ ...form, address: e.target.value })}
            className="border-2 border-purple-300 p-3 rounded-lg w-full md:w-1/4 focus:outline-none focus:border-purple-500"
            required
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={form.phone || ""}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="border-2 border-indigo-300 p-3 rounded-lg w-full md:w-1/4 focus:outline-none focus:border-indigo-500"
            required
          />
          <button
            type="submit"
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold transition ${
              editingId
                ? "bg-yellow-400 hover:bg-yellow-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <FaPlus />
            {editingId ? "Cập nhật" : "Thêm mới"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm({});
                setEditingId(null);
              }}
              className="ml-2 px-5 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
            >
              Hủy
            </button>
          )}
        </form>
        <div className="bg-white/90 rounded-xl shadow-lg p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white">
                <th className="p-3 rounded-tl-xl">Tên trường</th>
                <th className="p-3">Địa chỉ</th>
                <th className="p-3">Số điện thoại</th>
                <th className="p-3 rounded-tr-xl">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school, idx) => (
                <tr
                  key={school.id}
                  className={`${
                    idx % 2 === 0 ? "bg-blue-50" : "bg-purple-50"
                  } hover:bg-indigo-100 transition`}
                >
                  <td className="p-3 font-semibold text-blue-900">{school.name}</td>
                  <td className="p-3 text-purple-900">{school.address}</td>
                  <td className="p-3 text-indigo-900">{school.phone}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(school)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 shadow"
                    >
                      <FaEdit /> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(school.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 shadow"
                    >
                      <FaTrash /> Xóa
                    </button>
                  </td>
                </tr>
              ))}
              {schools.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-gray-500">
                    Không có trường nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;