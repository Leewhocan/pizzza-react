import React from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/Slicies/filterSlice";
const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef <HTMLInputElement>(null);
  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };
  // const testDebounce = debounce(() => {
  //   console.log("HELLO");
  // }, 350); и так как я ращметсил тест здесь то при изменении стейта search перерисовывался от этого она и не работала
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 350),
    []
  ); //useCallback работает как и useEffect, но он сохраняет (а не вызывает функцию)
  const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div>
      <svg
        className={styles.icon_search}
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
      >
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        value={value} // контролируемы инпут для очищения
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы.."
        ref={inputRef}
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.icon_cross}
          xmlns="http://www.w3.org/2000/svg"
          data-name="Capa 1"
          id="Capa_1"
          viewBox="0 0 20 19.84"
        >
          <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
        </svg>
      )}
    </div>
  );
};
export default Search;
