import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Api } from "../modules/api";

const ToDoContext = createContext({
  loading: true,
  error: "",
  data: [],
  dropDownValue: false,
  dropdownId: -1,
});

export const useToDoContext = () => {
  return useContext(ToDoContext);
};

export default function ToDoProvider({ children }) {
  const { loading, error, data, dropDownValue, dropdownId } = useToDoContext();

  const [query, setQuery] = useState("");
  const [showDropDown, setShowDropDown] = useState(dropDownValue);
  const [dropDownId, setDropDownId] = useState(dropdownId);
  const [state, setState] = useState({
    loading,
    error,
  });
  const [todos, setToDos] = useState(data);
  const [searchedToDos, setSearchedToDos] = useState([]);

  const getData = () => {
    Api.get()
      .then((res) => {
        setState({
          loading: false,
          error: false,
        });
        setToDos(res.data);
      })
      .catch((err) => {
        setState({
          loading: false,
          error: err.message,
        });
      });
  };

  const updateData = (id, data) => {
    Api.patch(id, data)
      .then((res) => {
        let clonedToDos = [...todos];
        const todoIndex = clonedToDos.findIndex((item) => item.id === id);
        if (todoIndex !== -1) {
          clonedToDos.splice(todoIndex, 1, res.data);
          setToDos(clonedToDos);
        }
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.message,
        });
      });
  };

  const deleteData = (id) => {
    Api.delete(id)
      .then((res) => {
        const newToDos = todos.filter((todo) => todo.id !== res.data.id);
        setToDos(newToDos);
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.message,
        });
      });
  };

  const createData = (data) => {
    Api.post(data)
      .then((res) => {
        setToDos([...todos, ...res.data]);
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.message,
        });
      });
  };

  const searchData = () => {
    const url = `?email=${query}`;
    Api.get(url)
      .then((res) => {
        setSearchedToDos(res.data);
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.message,
        });
      });
  };

  const onDropDownClick = (id) => {
    setDropDownId(id);
    setShowDropDown(!showDropDown);
  };

  const shouldShowDropDown = (id) => {
    return showDropDown && dropDownId === id;
  };

  const closeDropDown = () => {
    setShowDropDown(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const MemoisedSearchData = () => useCallback(() => searchData(), []);

  useEffect(() => {
    let timerId;
    if (query.length >= 3) {
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        MemoisedSearchData();
      }, 500);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [query, MemoisedSearchData]);

  const ToDoContextValues = {
    loading: state.loading,
    error: state.error,
    data: query.length > 0 ? searchedToDos : todos,
    createData,
    updateData,
    deleteData,
    onDropDownClick,
    shouldShowDropDown,
    closeDropDown,
    setQuery,
    query,
  };

  return (
    <ToDoContext.Provider value={ToDoContextValues}>
      {children}
    </ToDoContext.Provider>
  );
}
