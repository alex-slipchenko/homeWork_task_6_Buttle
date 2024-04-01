import React, { useEffect, useState } from "react";
import method from "../../service/getMethodApi";

export default function Form({
  spanName,
  liftingUser,
  liftingFollowers,
  stars,
  titleRezult,
  clearUser,
  setClearUser,
  clearButtonResset,
  setClearButtonResset,
}) {
  const [inputValue, setInputValue] = useState("");
  const [imgUser, setImgUser] = useState("");
  const [error, setError] = useState("");
  const [followers, setFollowers] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Сброс ошибки при изменении значения в поле ввода
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await method.getUser(inputValue);
      // Обработка успешного выполнения запроса
      setImgUser(response.data.avatar_url);
      setInputValue(response.data.login);
      setFollowers(response.data.followers);

      liftingUser(response.data.login);
      liftingFollowers(response.data.followers);
    } catch (error) {
      if (error.response) {
        setError("Username not exist: " + error.response.status);
      } else if (error.request) {
        setError("No response received");
        console.error("No response received:", error.request);
      } else {
        // В других случаях, когда произошла ошибка передачи
        setError("Error occurred: " + error.message);
        console.error("Error occurred:", error.message);
      }
    }
  };
  const handleResset = () => {
    setImgUser("");
    setInputValue("");
    liftingUser("");
    setFollowers("");
  };
  useEffect(() => {
    if (clearUser) {
      handleResset();
      setClearUser("");
      setClearButtonResset("");
    }
  }, [clearUser]);

  return (
    <form onSubmit={handleSubmit}>
      {stars && <div className="user__rezult">{titleRezult}</div>}
      {!imgUser && (
        <label>
          Choose <span>{spanName} </span> username :
          <input
            type="text"
            className={error ? "error_input" : null}
            value={inputValue}
            onChange={handleInputChange}
          />
          {error && <div className="error">{error}</div>}
        </label>
      )}

      {imgUser && <img src={imgUser} alt="User" className="img__user" />}
      {imgUser && <h2>{inputValue}</h2>}

      {stars && (
        <ul>
          <li>Followers :{followers}</li>
          <li>Repositories stars :{stars}</li>
          <li>Total score: {stars + followers}</li>
        </ul>
      )}

      {!imgUser && <button type="submit">Submit</button>}
      {imgUser && !clearButtonResset && (
        <button onClick={handleResset}>Resset</button>
      )}
    </form>
  );
}
