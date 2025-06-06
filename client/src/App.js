import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Redux authentication
import { useDispatch } from "react-redux";
import { checkAuth } from "./features/user";

// Pages
  //Public
import HomePage from "./containers/public/HomePage/HomePage";
import LoginPage from "./containers/public/LoginPage";
import RegisterPage from "./containers/public/RegisterPage";
import PageNotFound from "./containers/public/PageNotFound";
  //Private
import DashboardPage from "./containers/DashboardPage";
import GroupsPage from "./containers/GroupsPage";
import GroupPage from "./containers/GroupPage";
import EmployeesPage from "./containers/EmployeesPage"
import EmployeePage from "./containers/EmployeePage"
import ShiftsPage from "./containers/ShiftsPage/ShiftsPage"
import NewShiftPage from "./containers/NewShiftPage"
import ShiftPage from "./containers/ShiftPage"
import ConstraintPage from "./containers/ConstraintPage"

//components
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ConstraintsPage from "./containers/ConstraintsPage";

//Styling
import "./App.css";

const App = ()=>{
  const dispatch = useDispatch();

  // Keep login on page refresh
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  return (
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/login"    element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard"       element={<DashboardPage/>} />
            <Route path="/groups"          element={<GroupsPage />} />
            <Route path="/groups/:id"      element={<GroupPage />}/>
            <Route path="/employees"       element={<EmployeesPage />} />
            <Route path="/employees/:id"   element={<EmployeePage />} />
            <Route path="/constraints"     element={<ConstraintsPage />} />
            <Route path="/constraints/:id" element={<ConstraintPage />} />
            <Route path="/shifts"          element={<ShiftsPage />} />
            <Route path="/shifts/new"      element={<NewShiftPage />} />
            <Route path="/shifts/:id/:year/:month" element={<ShiftPage />}/>
          </Route>
          
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;