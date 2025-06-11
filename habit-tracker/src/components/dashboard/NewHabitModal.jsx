import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogDescription, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useGetCategoriesQuery, useAddCategoryMutation } from "../../features/category/categoryApi";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const colorOptions = [
    { name: "OceanBlue", value: "#3B82F6" },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Emerald', value: '#10B981' },
    { name: 'Rose', value: '#F43F5E' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Indigo', value: '#6366F1' }
]

const NewHabitModal = React.memo(({ open, onClose, habit, onSave }) => {

    const { data, isLoading } = useGetCategoriesQuery();
    const [addCategory] = useAddCategoryMutation();


    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategory = async () => {

        if (!newCategoryName.trim()) return; // bosmu kontrol et!

        try {
            const result = await addCategory(
                {
                    name: newCategoryName,
                    emoji: null

                }).unwrap();
            setNewCategoryName("");
        }
        catch (error) {
            console.error("Kategori ekleme hatası:", error);
        }
    }


    const [formData, setFormData] = useState({
        id: habit ? habit.id : "", // Use habit id if available, otherwise generate a new one
        name: habit ? habit.name : "",
        description: habit ? habit.description : "",
        color: habit ? habit.color : colorOptions[0].value, // Default color
        isCompletedToday: habit ? habit.isCompletedToday : false,
        categoryId: habit ? habit.categoryId : ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        onSave(formData);
        onClose(); // Close the modal after submission

    }, [formData, onSave, onClose]);

    return (
        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent className="sm:max-w-md lg:max-w-lg bg-white border-0 shadow-2xl" style={{ backgroundColor: formData.color }}>
                <DialogHeader className="space-y-3">
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        Yeni Alışkanlık Ekle
                    </DialogTitle>
                    <DialogDescription className="font-semibold text-gray-900">
                        Bu formu doldurarak yeni bir alışkanlık oluşturabilirsin.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-white">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                name="name"
                                placeholder="Örn: Yürüyüş"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                                required
                                maxLength={20} // Limit name length to 50 characters

                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium text-white">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                value={formData.description}
                                onChange={handleInputChange}
                                name="description"
                                placeholder="Örn: Günde 30 dakika yürüyüş yap"
                                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                                required
                            />
                        </div>
                        <div className="flex flex-col  gap-6">
                            <div className="space-y-2  ">
                                <Label htmlFor="categoryId" className="text-sm font-medium text-white">Kategori Seç</Label>
                                <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                                    <SelectTrigger className="!bg-white !text-gray-500">
                                        <SelectValue placeholder="Bir kategori seçin"></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {data?.value.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 w-full sm:w-1/2">
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="add-category">
                                        <AccordionTrigger className="text-sm text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all">+ Yeni Kategori Ekle</AccordionTrigger>
                                        <AccordionContent className="mt-2 space-y-2 bg-white/5 p-4 rounded-xl border border-white/10">
                                            <Label htmlFor="newCategoryName" className="text-sm font-medium text-white"></Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Kategori adı"
                                                    value={newCategoryName}
                                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"

                                                />
                                                <Button type="button" onClick={handleAddCategory}>Ekle</Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color" className="text-sm font-medium text-white">
                                Color
                            </Label>
                            <div className="grid grid-cols-6 gap-3">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                                        className={`
                                                    w-8 h-8 rounded-3xl transition-all duration-200 
                                                    hover:scale-110 hover:shadow-lg
                                                    ring-3 ring-offset-1 
                                                    ${formData.color === color.value
                                                ? 'ring-gray-800 ring-offset-2'
                                                : 'ring-transparent ring-offset-0'
                                            }
                                      `}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="border-gray-200 hover:bg-red-500" >
                                İptal
                            </Button>
                        </DialogClose>

                        <Button type="submit" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">Kaydet</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
);
export default NewHabitModal;