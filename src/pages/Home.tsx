import React, { useCallback } from "react";
import {
  selectFilter,
  setCategoryId,
  setPageCount,
} from "../redux/Slicies/filterSlice";
import { fetchPizzas } from "../redux/Slicies/pizzasSlice";
import { useSelector } from "react-redux";
import Categories from "../Components/Categories";
import Pagination from "../Components/Pagination";
import PizzaBlock from "../Components/PizzaBlok/PizzaBlock";
import Skeleton from "../Components/PizzaBlok/Skeleton";
import Sort from "../Components/Sort";
import { PizzaData } from "../redux/Slicies/pizzasSlice";
import { useAppDispatch } from "../redux/store";
const Home: React.FC = () => {
  const dispath = useAppDispatch();

  const {
    categoryId,
    pageCount: currentPage,
    sort: sortType,
    searchValue,
  } = useSelector(selectFilter);

  const { items, status } = useSelector(PizzaData);

  const onChangePage = (pageCount:number) => {
    dispath(setPageCount(pageCount));
  };

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onClickCategory = (id:number) => {
    dispath(setCategoryId(id));
  };

  const fetchPizzaUi = useCallback(async () => {
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `search=${searchValue}` : ``;

    try {
      dispath(
        
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage : String(currentPage),
        })
      );
    } catch (error) {
      alert("Упс,пиццы недоступны(");
    } finally {
    }
  }, [categoryId, sortType, searchValue, currentPage, dispath]);

  React.useEffect(() => {
    fetchPizzaUi();
  }, [fetchPizzaUi]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div>
          <h2>О-ошибка, пиццы недоступны </h2>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? skeletons // гененируем пустой массив
            : pizzas}
        </div>
      )}

      <Pagination onChangePage={onChangePage} />
      {/* ??? should i do props of current page */}
    </div>
  );
};
export default Home;
