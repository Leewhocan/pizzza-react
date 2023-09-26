import React from "react";

type CategoriesProps = {
  categoryId:number;
  onClickCategory: (idx:number)=>void;
}

const Categories : React.FC<CategoriesProps> = ({ categoryId, onClickCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index} // передаем только если массив статичен
            onClick={() => onClickCategory(index)} // вызов без анонимной устравиал бы рендер каждый аз когда код доходил бы до этой функции
            className={categoryId === index ? "active" : " "}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
