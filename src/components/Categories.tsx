import React from "react";

type CategorysProps = {
  value: number;
  onClickCategory: (idx: number) => void;
};

const Categories: React.FC<CategorysProps> = React.memo(
  ({ value, onClickCategory }) => {
    // const [activeIndex, setActiveIndex] = React.useState(0);

    const categories = [
      "Все",
      "Мясные",
      "Вегетарианская",
      "Гриль",
      "Острые",
      "Закрытые",
    ];

    // const onClickCategory = (index) => {
    //   setActiveIndex(index);
    // };
    return (
      <div className="categories">
        <ul>
          {categories.map((categotyName, i) => (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={value === i ? "active" : ""}
            >
              {categotyName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
