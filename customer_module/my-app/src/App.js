import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import TicketTable from "./components/TicketTable";
import TicketDetails from "./components/Description";
import ClientTable from "./components/ClientTable";
import NewTicketForm from "./components/NewTicket";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="big">
       {/* <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/ticket_table">TicketTable</Link>
      </li>
      <li>
        <Link to="/client_table">Client Table</Link>
      </li>
     
    </ul> */}
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/client_table" element={<ClientTable />} />
      <Route path="/new-ticket" element={<NewTicketForm />} />
      <Route path="/ticket_table" element={<TicketTable />} />
      <Route path="/description" element={<TicketDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>


    </div>
  );
}

export default App;
