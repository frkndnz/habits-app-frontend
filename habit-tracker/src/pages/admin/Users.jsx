import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { UserEditModal } from "../../components/admin/users/UserEditModal";
import { useGetUsersQuery } from "../../features/users/usersApi";
import { Pagination } from "../../components/Pagination";



export default function Users() {


  const [user, setUser] = useState(null);
  const [rawSearchTerm, setRawSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  


  const [isEditModal, setIsEditModal] = useState(false);

  const { data, error, isLoading } = useGetUsersQuery({
    searchTerm,
    page,
    pageSize
  });

  const handleEditClick = (userId) => {
    const user = data?.value.users.find(u => u.id === userId);
    setUser(user);
    setIsEditModal(true);
  }

  const handleClose = () => {
    setIsEditModal(false);

  }

  function handleDelete(id) {
    if (confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {

    }
  }
  const handleSearchTermChange = (e) => {
    setRawSearchTerm(e.target.value);
    setPage(1);
  }
  useEffect(()=>{
    const handler=setTimeout(() => {
      setSearchTerm(rawSearchTerm);
    }, 500);

    return()=> clearTimeout(handler);
  },[rawSearchTerm])

  return (
    <>
      {isEditModal && (<UserEditModal isOpen={isEditModal} OnClose={handleClose} user={user} />)}

      <div className="p-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold ">Kullanıcılar</h2>
          <input
            className="rounded-xl p-1 text-center  border-2 border-blue-300  focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
            type="text"
            placeholder="Search"
            maxLength={20}
            value={rawSearchTerm}
            onChange={handleSearchTermChange}

          ></input>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full  text-sm">
            <thead>
              <tr className="border-b ">
                <th className="p-2">ID</th>
                <th className="p-2">UserName</th>
                <th className="p-2">İsim</th>
                <th className="p-2">Email</th>
                <th className="p-2">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {data?.value?.users?.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{user.userName}</td>
                  <td className="p-2">{user.firstName} {user.lastName}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 flex justify-center gap-4">
                    <button className="text-blue-600 hover:underline cursor-pointer"
                      onClick={() => handleEditClick(user.id)}
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      className="text-red-600 hover:underline cursor-pointer"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {error && (
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
      <Pagination
        page={page}
        pageSize={pageSize}
        totalCount={data?.value.totalCount ?? 0}
        onPageChange={(newPage) => setPage(newPage)}
      />

    </>
  );


}
