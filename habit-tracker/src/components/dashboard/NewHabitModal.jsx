import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogDescription, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useDispatch} from "react-redux";
import { addHabit } from "../../features/habits/addHabit";
const NewHabitModal = () => {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name:"",
        title: "",
        description: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addHabit(formData));
        setIsOpen(false); // Close the modal after submission

    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => { setIsOpen(true) }} className="bg-blue-500 hover:bg-blue-600 text-white text-xl sm:text-2xl md:text-3xl font-semibold py-6 px-12 rounded-full shadow-md cursor-pointer">
                    New Habit
                </Button>

            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-md lg:max-w-lg bg-blue-200 rounded-lg shadow-lg  text-black">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Yeni Alışkanlık Ekle</DialogTitle>
                    <DialogDescription className="text-black">Bu formu doldurarak yeni bir alışkanlık oluşturabilirsin.</DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                name="name"
                                placeholder="Örn: Yürüyüş"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                name="title"
                                placeholder="Örn: Günde 30 dakika yürüyüş yap"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                value={formData.description}
                                onChange={handleInputChange}
                                name="description"
                                placeholder="Örn: Günde 30 dakika yürüyüş yap"
                                required
                            />
                        </div>
                    </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                            İptal
                        </Button>
                    </DialogClose>

                    <Button type="submit">Kaydet</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default NewHabitModal;