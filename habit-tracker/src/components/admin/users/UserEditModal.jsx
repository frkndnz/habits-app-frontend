import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogDescription, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useUpdateUserMutation } from "../../../features/users/usersApi"
import { parseFieldErrors } from "../../../utils/parseFieldErrors"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"


const roleData=[
    {name:"Admin",value:"Admin"},
    {name:"User",value:"User"}    
]

export const UserEditModal = ({ isOpen, OnClose, user }) => {

    const [fieldErrors, setFieldErrors] = useState({});

    const [formData, setFormData] = useState({
        id: user ? user.id : "", // Use habit id if available, otherwise generate a new one
        userName: user ? user.userName : "",
        firstName: user ? user.firstName : "",
        lastName: user ? user.lastName : "",
        email: user ? user.email : "",
        roleName:user ? user.roleName:"",
    });

    const [updateUser] = useUpdateUserMutation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(formData).unwrap();
            OnClose();
        } catch (error) {
            if (error?.data?.errorMessages) {

                setFieldErrors(parseFieldErrors(error.data.errorMessages));
            }
            else {
                console.log(error);
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={OnClose}>
            <DialogContent className="sm:max-w-md lg:max-w-lg bg-white border-0 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        Kullanıcıyı Düzenle
                    </DialogTitle>
                    <DialogDescription className="font-semibold text-gray-900">
                        Bu formu doldurarak kullanıcıyı düzenleyebilirsin
                    </DialogDescription>
                </DialogHeader>
                <form type="submit" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="userName" className="text-sm font-medium text-dark">UserName</Label>
                            <Input
                                id="userName"
                                value={formData.userName}
                                onChange={handleInputChange}
                                name="userName"
                                placeholder="userName"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                                required
                                maxLength={40} // Limit name length to 50 characters

                            />
                            {fieldErrors["userName"] && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors["userName"]}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-dark">FirstName</Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                name="firstName"
                                placeholder="firstName"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                                required
                                maxLength={40} // Limit name length to 50 characters

                            />
                            {fieldErrors["firstName"] && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors["firstName"]}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-dark">lastName</Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                name="lastName"
                                placeholder="lastName"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                                required
                                maxLength={40} // Limit name length to 50 characters

                            />
                            {fieldErrors["lastName"] && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors["lastName"]}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-dark">Email</Label>
                            <Input
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                name="email"
                                placeholder="email"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                                required
                                type="email"
                                maxLength={60} // Limit name length to 50 characters

                            />
                            {fieldErrors["email"] && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors["email"]}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="roleName" className="text-sm font-medium text-dark">Role</Label>
                            <Select value={formData.roleName} onValueChange={(value) => setFormData(prev => ({ ...prev, roleName: value }))}>
                                <SelectTrigger className="!bg-white !text-gray-500">
                                    <SelectValue placeholder="Bir kategori seçin"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {roleData.map((role,index) => (
                                        <SelectItem key={index} value={role.value}>
                                            {role.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline" className="border-gray-200 hover:bg-red-500" >
                                    İptal
                                </Button>
                            </DialogClose>
                            <Button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">Kaydet</Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};