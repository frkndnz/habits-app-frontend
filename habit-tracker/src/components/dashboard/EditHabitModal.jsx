import { useState ,useEffect, use} from "react";
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogDescription, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const EditHabitModal = ({ open,onClose,habit,onSave }) => {

    const [formData, setFormData] = useState({
        name: habit.name || "",
        title: habit.title || "",
        description: habit.description || ""
    });
    useEffect(()=>{
        setFormData({
            id: habit.id || "",
            name: habit.name ,
            title: habit.title || "",
            description: habit.description || ""
        });
    }, [habit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose(); // Close the modal after submission
    };

    return(
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Alışkanlığı Düzenle</DialogTitle>
                        <DialogDescription className="text-black">Bu formu doldurarak alışkanlığı düzenleyebilirsin.</DialogDescription>
                    </DialogHeader>
                    <Label htmlFor="name" className="mb-2">Alışkanlık Adı</Label>
                    <Input value={formData.name} onChange={handleInputChange} name="name"  required className="mb-4" />
                    <Label htmlFor="title" className="mb-2">Başlık</Label>
                    <Input value={formData.title} onChange={handleInputChange} name="title" placeholder="Başlık" required className="mb-4" />
                    <Label htmlFor="description" className="mb-2">Açıklama</Label>
                    <Input value={formData.description} onChange={handleInputChange} name="description" placeholder="Açıklama" required className="mb-4" />
                    <DialogFooter>
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Kaydet</Button>
                        <DialogClose asChild>
                            <Button type="button" className="bg-gray-300 hover:bg-gray-400 text-black ml-2">İptal</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditHabitModal;