import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

const dummyUsers = [
  { id: 1, name: "Ali Yılmaz", email: "ali@example.com" },
  { id: 2, name: "Ayşe Demir", email: "ayse@example.com" },
];

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Gerçek API varsa burada fetch yaparsın
    setUsers(dummyUsers);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Kullanıcılar</h2>
      <div className="overflow-x-auto">
        <table className="w-full  text-sm">
          <thead>
            <tr className="border-b ">
              <th className="p-2">ID</th>
              <th className="p-2">İsim</th>
              <th className="p-2">Email</th>
              <th className="p-2">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 flex justify-center gap-4">
                  <button className="text-blue-600 hover:underline">
                    <Pencil size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Kullanıcı bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleDelete(id) {
    if (confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  }
}
