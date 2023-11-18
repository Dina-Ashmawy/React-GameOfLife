import './App.css';
import { numCols, numRows } from './constants';
import GameOfLife from './containers/gameOfLife/GameOfLife';

function App() {
  return (
    <div className="App">
      <GameOfLife initialRows={numRows} initialCols={numCols} />
    </div>
  );
}

export default App;
