import { useState } from "react";
import { FaDivide, FaTimes, FaPlus, FaMinus, FaEquals } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import styles from './styles/App.module.scss';

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  };

  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  };

  return (
    <div className={styles.App}>
      <main className={styles.calculator}>
        <header className={styles.display}>
          {result ? <span>({result})</span> : ""}
          {calc || "0"}
        </header>
        <section className={styles.operators}>
          <button onClick={() => updateCalc("/")}>
            <FaDivide />
          </button>
          <button onClick={() => updateCalc("*")}>
            <FaTimes />
          </button>
          <button onClick={() => updateCalc("+")}>
            <FaPlus />
          </button>
          <button onClick={() => updateCalc("-")}>
            <FaMinus />
          </button>

          <button onClick={deleteLast}>
            <FiDelete />
          </button>
        </section>
        
        <section className={styles.digits}>
          {createDigits()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>
            <FaEquals />
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
