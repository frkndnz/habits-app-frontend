import {Card,CardContent} from "@/components/ui/card";

export const StatCard=({icon:Icon,title,value})=>{
    return(
        <Card className="flex items-center gap-4 p-4">
            <div className="bg-teal-100 text-teal-600 rounded-full p-3">
                <Icon size={24}></Icon>
            </div>
            <CardContent>
                <p className="text-sm text-muted-foreground">{title}</p>
                <h3 className="text-lg font-bold">{value}</h3>
            </CardContent>
        </Card>
    );
}