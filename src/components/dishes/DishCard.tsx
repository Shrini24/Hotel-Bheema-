
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DishCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary?: string[];
  onAddToCart: (id: string) => void;
}

const DishCard: React.FC<DishCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  category,
  dietary = [],
  onAddToCart
}) => {
  return (
    <Card className="dish-card">
      <div className="relative">
        <img src={image} alt={name} className="h-48 w-full object-cover" />
        <Badge className="absolute top-2 right-2">{category}</Badge>
      </div>
      <CardHeader className="pt-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg font-serif">{name}</h3>
          <span className="font-bold text-hotel-600">${price.toFixed(2)}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
        {dietary.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {dietary.map((item) => (
              <Badge key={item} variant="outline" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button onClick={() => onAddToCart(id)} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DishCard;
