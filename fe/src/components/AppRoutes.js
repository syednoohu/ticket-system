import React from 'react'
import {  Routes, Route, Navigate } from 'react-router-dom'

import ClientLayout from "../components/ClientLayout";

import Login from "../components/Login";
import Client from "../components/Client";
import Order from "../components/Order";
import Project from "../pages/project/Project";
import User from "../pages/user/User";
import ProjectNew from "../pages/project/ProjectNew";
import ShopNew from "../pages/shop/ShopNew";
import Company from "../pages/company/Company";
import Shop from "../pages/shop/Shop";
import CompanyNew from "../pages/company/CompanyNew";
import UserNew from "../pages/user/UserNew";
import Dashboard from "../components/Dashboard";
import Ticket from "../components/Ticket";
function AppRoutes() {
  return (
    <Routes>
          <Route path="/" element = { <Navigate to ="/login" replace /> } /> 
          <Route path="/login" element = { <Login/> } /> 
            <Route  element={ <ClientLayout/> }>
              <Route path="order" element = { <Order/> } /> 
              <Route path="dashboard" element = { <Dashboard/> } /> 
              <Route path="ticket" element = { <Ticket/> } /> 
              <Route path="client" element = { <Client/> } /> 
              <Route path="project" element = { <Project/> } /> 
              <Route path="company" element = { <Company/> } /> 
              <Route path="shop" element = { <Shop/> } /> 
              <Route path="CompanyNew" element = { <CompanyNew/> } /> 
              <Route path="user" element = { <User/> } /> 
              <Route path="ProjectNew" element = { <ProjectNew/> } /> 
              <Route path="userNew" element = { <UserNew/> } /> 
              <Route path="ShopNew" element = { <ShopNew/> } /> 
              </Route>
          </Routes>
  )
}

export default AppRoutes