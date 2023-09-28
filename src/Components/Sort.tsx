import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSort, setSort,SortPropertyEnum,SortTYPE } from "../redux/Slicies/filterSlice";

type M = MouseEvent & {
  path: Node[];  
}
function Sort() {
  const [isVisiblePopUp, setIsVisiblePopUp] = React.useState(false);

  const dispath = useDispatch();
  const sortType = useSelector(selectSort);

  const sortRef = React.useRef <HTMLDivElement>(null);


  const list:SortTYPE[] = [
    { name: "популярности (DESC)", sortProperty: SortPropertyEnum.Rating_DESC },
    { name: "популярности (ASC)", sortProperty: SortPropertyEnum.Rating_ASC },
    { name: "цене (DESC)", sortProperty: SortPropertyEnum.Price_DESC },
    { name: "цене (ASC)", sortProperty: SortPropertyEnum.Price_ASC },
    { name: "алфавиту (DESC)", sortProperty: SortPropertyEnum.Title_DESC},
    { name: "алфавиту (ASC)", sortProperty: SortPropertyEnum.Title_ASC },
  ];
  const onClickSort = (obj:SortTYPE) => {
    dispath(setSort(obj));
  };

  React.useEffect(() => {
    // почему старый обработчик не удаляется при перерендере?
    const handleClick = (event:M) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsVisiblePopUp(false);
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      // когда происходит размантирование компонента то удали обработчик
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisiblePopUp(!isVisiblePopUp)}>
          {sortType.name}
        </span>
      </div>
      {isVisiblePopUp && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickSort(obj)}
                className={
                  sortType.sortProperty === obj.sortProperty ? "active" : " "
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Sort;
