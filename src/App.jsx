import React, { useState, useEffect } from "react";
import method from "./service/getMethodApi";
import "./App.css";
// import method from "./service/getMethodApi";
import Form from "./components/FormUsers/Form";
export default function App() {
  const [userFirst, setUserFirst] = useState("");
  const [userSecond, setUserSecond] = useState("");

  const [reposFirst, setRpeosFirst] = useState("");
  const [reposSecond, setRpeosSecond] = useState("");

  const [userFollower1, setUserFollower1] = useState("");
  const [userFollower2, setUserFollower2] = useState("");

  const [rezult1, setRezult1] = useState("");
  const [rezult2, setRezult2] = useState("");

  const [clearUser, setClearUser] = useState("");
  const [clearButtonResset, setClearButtonResset] = useState("");

  // Функция для вычисления суммы значений свойства stargazers_count в массиве объектов
  const calculateSum = (data) => {
    return data.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.stargazers_count,
      0
    );
  };

  async function sendMultipleRequests() {
    try {
      // Отправляем два запроса параллельно и дожидаемся их выполнения
      const [response1, response2] = await Promise.all([
        method.getReposUser(userFirst),
        method.getReposUser(userSecond),
      ]);

      setRpeosFirst(calculateSum(response1));
      setRpeosSecond(calculateSum(response2));
      console.log(reposFirst);
      console.log(reposSecond);
      console.log("в запросе");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  const handleBattle = async () => {
    await sendMultipleRequests();
    setUserFirst("");
    setUserSecond("");
    setClearButtonResset("delete");
  };

  useEffect(() => {
    setRezult1(userFollower1 + reposFirst);
    setRezult2(userFollower2 + reposSecond);
  }, [reposFirst, reposSecond]);

  const handleRestart = () => {
    setRpeosFirst("");
    setRpeosSecond("");
    setUserFollower1("");
    setUserFollower2("");
    setRezult1("");
    setRezult2("");
    setClearUser(true);
  };
  return (
    <div className="container">
      <h2> Let's Get Ready to Rumble </h2>
      <div className="form__wrapper">
        <Form
          titleRezult={rezult1 > rezult2 ? "Winner 🥳" : "Loser 🥵"}
          spanName={"Player1"}
          liftingUser={setUserFirst}
          liftingFollowers={setUserFollower1}
          stars={reposFirst}
          clearUser={clearUser}
          setClearUser={setClearUser}
          clearButtonResset={clearButtonResset}
          setClearButtonResset={setClearButtonResset}
        />
        <Form
          titleRezult={rezult1 > rezult2 ? "Loser 🥵" : "Winner 🥳"}
          spanName={"Player2"}
          liftingUser={setUserSecond}
          liftingFollowers={setUserFollower2}
          stars={reposSecond}
          clearUser={clearUser}
          setClearUser={setClearUser}
          clearButtonResset={clearButtonResset}
          setClearButtonResset={setClearButtonResset}
        />
      </div>
      {userFirst && userSecond && (
        <button onClick={handleBattle}>Battle!</button>
      )}
      {rezult1 && rezult2 && (
        <button onClick={handleRestart}>Restart 🔄</button>
      )}
    </div>
  );
}
