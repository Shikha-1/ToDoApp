import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useToDoContext } from "../context/AppContext";

export default function ToDoForm() {
  const [formData, setFormData] = useState({
    email: "",
    description: "",
  });

  const { updateData, createData } = useToDoContext();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state ?? null;

  useEffect(() => {
    if (data) {
      setFormData({
        email: data.email,
        description: data.desciption,
      });
    }
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.email.length > 0 && formData.description.length > 0) {
      if (id) {
        updateData(id, {
          id,
          desciption: formData.description,
          done: data.done,
          email: formData.email,
        });
      } else {
        createData({
          id: new Date().getTime(),
          desciption: formData.description,
          done: false,
          email: formData.email,
        });
      }
      setFormData({
        email: "",
        description: "",
      });
      navigate("/");
    }
  };

  return (
    <div className="ToDoForm">
      <h2>{`${id ? `EDIT` : `ADD`} TO DO`}</h2>
      <br />
      <form>
        <label htmlFor="email">Email:*</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email (required)"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <label htmlFor="description">Description:*</label>
        <input
          required
          placeholder="Description (required)"
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
        <button onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
}
