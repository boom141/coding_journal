import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Journal from './component/Journal';
import Task from './component/Task';


function App() {
  return (
    <>
      <div className='d-flex justify-content-around align-items-center'>
        <Journal />
        <Task />
      </div>
    </>
  );
}

export default App;
