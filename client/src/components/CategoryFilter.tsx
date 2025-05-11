import { Category } from "@/types";

interface CategoryFilterProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onSelect }) => {
  return (
    <div className="px-4 pt-6 pb-2">
      <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            className="flex flex-col items-center justify-center min-w-[80px]"
            onClick={() => onSelect(category)}
          >
            <div
              className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mb-2 overflow-hidden`}
            >
              <img 
                src={category.imageUrl}
                alt={category.name}
                className="h-10 w-10 object-cover"
              />
            </div>
            <span className="text-xs font-medium text-center">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
