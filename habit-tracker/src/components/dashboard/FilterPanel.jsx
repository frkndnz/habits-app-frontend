import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useGetCategoriesQuery } from "../../features/category/categoryApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export default function FilterPanel({ filter, onChange }) {

    const { data } = useGetCategoriesQuery();
const [open, setOpen] = useState(false);
    const categories = data?.value;
    return (
        <div className="relative mt-2">
            <Button
                variant="outline"
                className="flex items-center gap-2 mb-4"
                onClick={() => setOpen(!open)}
            >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </Button>
            {open && (


                <div className="absolute top-full mt-2 left-0 flex flex-col gap-4 p-4 z-10 bg-gray-400 shadow-md rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Status Filter */}

                    <Select
                        value={filter.status}
                        onValueChange={(val) => onChange({ status: val })}
                    >
                        <SelectTrigger className="w-[140px] bg-muted ">
                            Status: {filter.status}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="capitalize" value="all">All</SelectItem>
                            <SelectItem className="capitalize" value="complete">Completed</SelectItem>
                            <SelectItem className="capitalize" value="incomplete">Incomplete</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Category Filter */}
                    <Select
                        value={filter.category}
                        onValueChange={(val) => onChange({ category: val })
                        }
                    >
                        <SelectTrigger className="w-[140px] bg-muted">
                            Category: {filter.category}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            {categories?.map((category, index) => {
                                return (

                                    <SelectItem key={index} className="capitalize" value={category.name}>{category.name}</SelectItem>
                                );
                            })}

                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    );
}
