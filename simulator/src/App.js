import React, {useState} from 'react';
import Map from './pages/Map'
import ModalComponent from './components/Modal'; 

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState("")
  return (
    <div className="App">
      <Map isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setId={setId}/>
      <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} id={id}/>
    </div>
  );
}

export default App;
