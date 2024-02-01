import styles from "./UserInfo.module.css";

import { useState, useEffect } from "react";

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pastSearches, setPastSearches] = useState([]);
  const [wrongSearch, setWrongSearch] = useState(false);
  const fetchUserInfoData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchUserInfoData();
    const storedSearches = localStorage.getItem("pastSearches");
    if (storedSearches) {
      setPastSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
  }, [pastSearches]);

  const searchUsers = () => {
    setWrongSearch(false);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (!filtered.length) {
      setWrongSearch(true);
      setPastSearches((prevSearches) => [...prevSearches, searchTerm]);
      return;
    }
    setFilteredUsers(filtered);
    const userName = filtered.map((user) => user.name);
    setPastSearches((prevSearches) => [...prevSearches, ...userName]);
    setSearchTerm("");
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByName = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredUsers(sortedUsers);
  };
  const handleReset = () => {
    setFilteredUsers(users);
  };

  const handleClearPastSearch = () => {
    localStorage.clear();
    setPastSearches([]);
  };
  return (
    <div className={styles.userWrapper}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          id="search-input"
          value={searchTerm}
          placeholder="Search by Name"
          onChange={handleSearchInputChange}
        />
        <button className={styles.searchButton} onClick={searchUsers}>
          Search
        </button>
      </div>
      <div className={styles.user}>
        <h2>Users:</h2>
        <button className={styles.filterByName} onClick={handleSortByName}>
          Sort by Name
        </button>
        <button className={styles.filterByName} onClick={handleReset}>
          Reset
        </button>
      </div>

      {!wrongSearch && (
        <table className={styles.usertable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className={styles.useritem}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {wrongSearch && (
        <div className={styles.productNotFound}>No product found</div>
      )}
      <div className={styles.pastSearch}>
        <h2>Past Searches:</h2>
        <button
          className={styles.pastSearchbtn}
          onClick={handleClearPastSearch}
        >
          clear past search
        </button>
      </div>
      <ul className={styles.pastSearchWrapper}>
        {pastSearches.map((search, index) => (
          <li key={index}>{search}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserInfo;
