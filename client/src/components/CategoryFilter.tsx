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
              className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mb-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={category.icon}
                />
              </svg>
            </div>
            <span className="text-xs font-medium text-center">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
