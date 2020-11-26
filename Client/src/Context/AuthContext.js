import React, { createContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthServices";
import SpinnerComponent from "../components/Spinner/Spinner";
export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState({
    isError: null,
    errorMsg: "",
  });

  // DoctorAppointment Place by Patient
  const [doctorID, setDoctorID] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTimeCell, setAppointmentTimeCell] = useState(null);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      console.log(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <div style={{ textAlign: "center", marginTop: "20%" }}>
          <SpinnerComponent />
        </div>
      ) : (
        <AuthContext.Provider
          value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            error,
            setError,
            isLoaded,
            setIsLoaded,
            appointmentDate,
            setAppointmentDate,
            doctorID,
            setDoctorID,
            appointmentTimeCell,
            setAppointmentTimeCell,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
