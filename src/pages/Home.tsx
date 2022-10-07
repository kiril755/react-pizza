import React from "react";

import qs from "qs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import Sort, { listFilter } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/index";

import {
  FilterSliceState,
  selectfilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import {
  fetchPizzas,
  SearchPizzaParams,
  selectPizzaData,
} from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { items, status } = useSelector(selectPizzaData);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectfilter);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const seacrh = searchValue ? `&search=${searchValue.toLowerCase()}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        seacrh,
        currentPage: String(currentPage),
      })
    );
  };

  // Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort, searchValue, currentPage]);

  // Если был первый рендер, то проверяю URL параметры и сохраняем в редаксе
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;

  //     const sort = listFilter.find((obj) => obj.sortProperty === params.sortBy);

  //     первый вариант который был у меня 03.10
  //     dispatch(setFilters({ ...params, sort }));

  //     второй вариант из видео #24 1:31:00
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       })
  // );
  //     isSearch.current = true;
  //   }
  // }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    // первый вариант мой:
    // if (window.location.search) {
    //   getPizzas();
    // }

    // window.scrollTo(0, 0);
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы, попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
