import React from "react";
import { useToDoContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp";
import NoPage from "../components/NoPage";
import "../pages/Misc.scss";

function Home() {
  const {
    loading,
    error,
    data,
    deleteData,
    onDropDownClick,
    shouldShowDropDown,
    closeDropDown,
    setQuery,
    query,
    updateData,
  } = useToDoContext();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
  };

  if (loading) {
    return <NoPage message="Loading..." />;
  }
  if (error) {
    return <NoPage message={error} />;
  }
  return (
    <div className="Home">
      <div className="heading">
        <h2>To Do List</h2>
        <input
          className="search"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by email..."
        />
        <button className="searchBtn" onClick={() => navigate("/todo/add")}>
          Add To Do
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Description</th>
            <th>Options</th>
            <th>Mark as Complete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.attributes.email}</td>
              <td>{todo.attributes.desciption}</td>
              <td
                className="optionBtn"
                onClick={() => onDropDownClick(todo.id)}
              >
                &#10247;
                {shouldShowDropDown(todo.id) && (
                  <PopUp onClickOutside={() => closeDropDown()}>
                    <div className="btnList">
                      <button
                        className="btn edit"
                        onClick={() =>
                          navigate(`/todo/edit/${todo.id}`, {
                            state: todo.attributes,
                          })
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => deleteData(todo.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </PopUp>
                )}
              </td>
              <td>
                <input
                  className="checkbox"
                  checked={todo.attributes.done}
                  type="checkbox"
                  onChange={() => {
                    updateData(todo.id, {
                      done: !todo.attributes.done,
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
