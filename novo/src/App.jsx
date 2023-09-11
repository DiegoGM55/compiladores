import './App.css'
import CustomTextarea from './components/CustomTextarea/CustomTextarea';

function App() {

  function handleChange(value) {
    console.log(value)
  }
  return (
    <>
      <CustomTextarea onChange={handleChange}/>
    </>
  )
}

export default App
