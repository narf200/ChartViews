import './App.css';
import BarChart from "./BarChart/BarChart";
import Devices from "./Main/Devices";

function App() {
  return (
    <div className={"wrapper"}>
        <Devices />
        <BarChart/>
    </div>
  );
}

export default App;

