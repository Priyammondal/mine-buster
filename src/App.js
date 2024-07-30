import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [scam, setScam] = useState(false);
  const [clickedItems, setClickedItems] = useState([]);
  const [entryAmount, setEntryAmount] = useState(100);
  const [cashWin, setCashWin] = useState(0);
  const [mineIndex, setMineIndex] = useState();

  useEffect(() => {
    if (clickedItems.includes(mineIndex)) {
      setTimeout(() => {
        alert(`Game Over!!🎉You have won ₹${cashWin}🥳`);
        setClickedItems([]);
        setEntryAmount(100);
        setGameStarted(false);
        setMineIndex(15);
        setCashWin(0);
        setScam(false);
      }, 100);
    } else {
      setCashWin(clickedItems.length * 100);
    }
  }, [clickedItems]);

  useEffect(() => {
    if (entryAmount <= cashWin) {
      const randomNumber = getRandomNumber(clickedItems);
      setMineIndex(randomNumber);
    }
  }, [cashWin]);

  function getRandomNumber(excludedArray) {
    const numbers = Array.from({ length: 16 }, (_, i) => i);
    const filteredNumbers = numbers.filter(
      (num) => !excludedArray.includes(num)
    );
    const randomIndex = Math.floor(Math.random() * filteredNumbers.length);
    return filteredNumbers[randomIndex];
  }

  const handleClick = (e) => {
    if (gameStarted) {
      const li = e.target.closest("li");
      if (li) {
        const index = parseInt(li.dataset.index);
        setClickedItems((prev) =>
          prev.includes(index) ? prev : [...prev, index]
        );
        if (scam) {
          setMineIndex(index);
        }
      }
    } else {
      alert("Please Start Game!!😅");
    }
  };

  const handleEntryAmount = (e) => {
    setEntryAmount(parseInt(e.target.value));
  };

  return (
    <div className="App">
      <h1>Mine Buster</h1>
      <section>
        <button
          className="scamBtn"
          style={{
            backgroundColor: scam ? "red" : "green",
          }}
          onClick={() => setScam((prev) => !prev)}
        >
          SCAM
        </button>
        <section className="entry">
          <div>
            <label htmlFor="">Entry Amount </label>
            <select
              value={entryAmount}
              disabled={gameStarted}
              onChange={handleEntryAmount}
            >
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
          </div>
          <button
            style={{
              backgroundColor: gameStarted ? "#ccc" : "purple",
              cursor: gameStarted && "not-allowed",
            }}
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
        </section>
        <p>{`Cash Win : ₹${cashWin}`}</p>
      </section>

      <section className="game">
        <ul className="outer" onClick={handleClick}>
          {[...Array(16)].map((_, index) => (
            <li
              key={index}
              data-index={index}
              className={`inner val-${index + 1}`}
              style={{
                backgroundColor:
                  clickedItems.includes(index) && index !== mineIndex
                    ? "green"
                    : clickedItems.includes(mineIndex) && index === mineIndex
                    ? "red"
                    : "#ccc",
              }}
            ></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
