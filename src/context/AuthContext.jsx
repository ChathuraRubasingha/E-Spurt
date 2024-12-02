import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const register = (name, email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some((user) => user.email === email);

    if (userExists) {
      throw new Error('User already exists');
    } else {
      const newUser = { name, email, password };
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      setUser({ name, email });
    }
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const matchedUser = existingUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      setUser({ name: matchedUser.name, email: matchedUser.email });
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
