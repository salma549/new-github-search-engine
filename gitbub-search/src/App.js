// import React from 'react';

// import Header from "./components/Header"

// import Footer from './components/Footer';
// import './index.css';

// function App() {
//   return (
//     <div className="flex flex-col min-h-screen">
    
//       <Header />
//       <Footer />
//     </div>
//   );
// }

// export default App;



// import './App.css';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import Header from "./components/Header"
// import Footer from './components/Footer';
// import './index.css';
// import { Routes, Route } from 'react-router-dom';

// import Main from './components/Main';
// import Search from './components/Search';
// import UserProfile from './components/UserProfile';

// function App() {
//   const [users, setUsers] = useState([]);

//   const searchUsers = async (userName) => {
//     try {
//       let result = await axios.get(`https://api.github.com/search/users?q=${userName}`);
//       setUsers(result.data.items);
//       console.log(result.data.items);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const defaultUsers = async () => {
//     try {
//       let result = await axios.get('https://api.github.com/users');
//       console.log(result.data);
//       setUsers(result.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     defaultUsers();
//   }, [])

//   return (
//     <>
     
//     <Header />
//          <Search searchUsers={searchUsers} />
//         {/* <Main users={users} />  */}

// <Routes>
        
//         <Route path='/' element={<Main users={users} />} />
//         <Route path='/user/:username' element={<UserProfile/>}/>
//       </Routes>
//         <Footer />
     
//     </>
//   );
// }

// export default App;

// import React from 'react';
// import './App.css';
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import Header from "./components/Header";
// import Footer from './components/Footer';
// import './index.css';
// import { Routes, Route } from 'react-router-dom';

// import Main from './components/Users';
// import Search from './components/Search';
// import UserProfile from './components/UserProfile';
// import Navbar from './components/NavBar';

// function App() {
//   const [users, setUsers] = useState([]);

//   const searchUsers = async (userName) => {
//     try {
//       let result = await axios.get(`https://api.github.com/search/users?q=${userName}`);
//       setUsers(result.data.items);
//       console.log(result.data.items);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const defaultUsers = async () => {
//     try {
//       let result = await axios.get('https://api.github.com/users');
//       console.log(result.data);
//       setUsers(result.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     defaultUsers();
//   }, [])

//   return (
//     <>
   
//       <Header />
//       <Navbar />
//       <Search searchUsers={searchUsers} />
//       <Routes>
//         <Route path='/' element={<Main users={users} />} />
//         <Route path='/users/:username' element={<UserProfile />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;




// packages
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from 'axios';

import Users from "./components/Users";
import Search from "./components/Search";



import UserPage from "./pages/UserPage";
import Header from "./components/Header";
import Footer from "./components/Footer";



function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  // Fetching the user data from GitHub
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("https://api.github.com/users"
       
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error); // Improved error logging
      }
    };
    getData();
  }, []);

  const getUser = async (username) => {
    try {
      const { data } = await axios.get(`https://api.github.com/users/${username}`
     
      );
      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error); // Improved error logging
    }
  };

  const searchUsers = async (username) => {
    try {
      const { data } = await axios.get(`https://api.github.com/search/users?q=${username}`
       // Add API key to search request as well
      );
      setUsers(data.items); // Check if 'data.items' exists
    } catch (error) {
      console.error("Error searching for users:", error); // Improved error logging
    }
  };

  return (
   <>
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/github-user-search/"
            element={
              <>
                <Search searchUsers={searchUsers} />
                <Users users={users} />
              </>
            }
          />
          
          <Route path="/github-user-search/user/:username" element={<UserPage getUser={getUser} user={user} />} />
        </Routes>
        <Footer />
      </div>
      </>
   
  );
}

export default App;