import React, { useState, useEffect } from "react";
import "./App.css";
import { GoHeartFill } from "react-icons/go";
import { IoPaw } from "react-icons/io5";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Owner from "./Owner";
import OwnerRecommendations from "./OwnerRecommendations";
import OwnerAccount from "./OwnerAccount";
import OwnerLogout from "./OwnerLogout";
import OwnerVisit from "./OwnerVisit";
import OwnerChooseAnimal from "./OwnerChooseAnimal";
import Admin from "./Admin";
import Vet from "./Vet";
import VetAccount from "./VetAccount";
import VetLogout from "./VetLogout";
import VetAddVisit from "./VetAddVisit";
import VetConfirmAddVisit from "./VetConfirmAddVisit";
import VetSuccess from "./VetSuccess";
import VetVisit from "./VetVisit";
import VetAddRecommendation from "./VetAddRecommendation";
import VetConfirmAddRecommendation from "./VetConfirmAddRecommendation";
import VetModifyRecommendation from "./VetModifyRecommendation";
import VetConfirmModifyRecommendation from "./VetConfirmModifyRecommendation";
import VetModifyVisit from "./VetModifyVisit";
import VetConfirmModifyVisit from "./VetConfirmModifyVisit";
import VetConfirmDeleteVisit from "./VetConfirmDeleteVisit";
import VetConfirmDeleteRecommendation from "./VetConfirmDeleteRecommendation";

// przykładowi użytkownicy
const users = [
  { numer_tel: "111111111", haslo: "haslo1", typ: "admin" },
  {
    numer_tel: "222222222",
    haslo: "haslo2",
    typ: "wlasciciel",
    zwierzeta: ["Pimpek"],
  },
  {
    numer_tel: "333333333",
    haslo: "haslo3",
    typ: "wlasciciel",
    zwierzeta: ["Bubuś", "Zgredek"],
  },
  { numer_tel: "444444444", haslo: "haslo4", typ: "weterynarz" },
];

// ekran ładowania
function LoadingScreen() {
  return (
    <div className="app-background-gradient">
      <header>
        <p className="logo-text-loading">PupilMed</p>
        <div className="heart-with-paw">
          <GoHeartFill className="heart-icon-loading" />
          <IoPaw className="paw-icon-loading" />
        </div>
      </header>
    </div>
  );
}

// główny ekran początkowy
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // efekt ładowania
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  // przejście do ekranu z logowaniem
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="app-background-gradient">
      <header>
        <div className="main-white-box">
          <p className="big-text">Witaj w aplikacji</p>
          <p className="big-text">PupilMed!</p>
          <p className="small-text">Przejdź dalej, aby się zalogować.</p>
          <button className="login-button" onClick={handleLoginClick}>
            Przejdź do logowania
          </button>
        </div>
        <div className="logo-container">
          <p className="logo-text">PupilMed</p>
          <div className="heart-with-paw">
            <GoHeartFill className="heart-icon" />
            <IoPaw className="paw-icon" />
          </div>
        </div>
      </header>
    </div>
  );
}

// ekran logowania
function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // sprawdzenie, czy użytkownik nie jest już zalogowany
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (loggedInUser) {
      if (loggedInUser.typ === "admin") {
        navigate("/admin");
      } else if (loggedInUser.typ === "wlasciciel") {
        if (loggedInUser.zwierzeta && loggedInUser.zwierzeta.length > 1) {
          navigate("/ownerchooseanimal");
        } else {
          navigate("/owner");
        }
      } else if (loggedInUser.typ === "weterynarz") {
        navigate("/vet");
      }
    }
  }, [navigate]);

  // zalogowanie, jeżeli użytkownik kliknie przycisk "zaloguj się"
  const handleLogin = () => {
    const user = users.find(
      (u) => u.numer_tel === phone && u.haslo === password
    );
    if (user) {
      localStorage.setItem("isLoggedIn", JSON.stringify(user));
      if (user.typ === "admin") {
        navigate("/admin");
      } else if (user.typ === "wlasciciel") {
        if (user.zwierzeta && user.zwierzeta.length > 1) {
          navigate("/ownerchooseanimal");
        } else {
          navigate("/owner");
        }
      } else if (user.typ === "weterynarz") {
        navigate("/vet");
      }
    } else {
      setError("Niepoprawny numer telefonu lub hasło");
    }
  };

  return (
    <div className="app-background-gradient">
      <header className="PupilMed">
        <div className="main-white-box">
          <p className="big-text">Zaloguj się</p>
          <p className="big-text">do aplikacji.</p>
          <div className="login-form">
            <label htmlFor="phone" className="form-label">
              Numer telefonu
            </label>
            <input
              type="text"
              id="phone"
              className="input-field"
              placeholder="Wpisz numer telefonu"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label htmlFor="password" className="form-label">
              Hasło
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Wpisz hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
          <button className="login-button2" onClick={handleLogin}>
            Zaloguj się
          </button>
        </div>
        <div className="logo-container">
          <p className="logo-text">PupilMed</p>
          <div className="heart-with-paw">
            <GoHeartFill className="heart-icon" />
            <IoPaw className="paw-icon" />
          </div>
        </div>
      </header>
    </div>
  );
}

// routes w aplikacji wraz z dostępami
export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/owner"
          element={
            <PrivateRoute allowedTypes={["wlasciciel"]} component={Owner} />
          }
        />
        <Route
          path="/ownerchooseanimal"
          element={
            <PrivateRoute
              allowedTypes={["wlasciciel"]}
              component={OwnerChooseAnimal}
            />
          }
        />
        <Route
          path="/ownerrecommendations"
          element={
            <PrivateRoute
              allowedTypes={["wlasciciel"]}
              component={OwnerRecommendations}
            />
          }
        />
        <Route
          path="/owneraccount"
          element={
            <PrivateRoute
              allowedTypes={["wlasciciel"]}
              component={OwnerAccount}
            />
          }
        />
        <Route
          path="/ownerlogout"
          element={
            <PrivateRoute
              allowedTypes={["wlasciciel"]}
              component={OwnerLogout}
            />
          }
        />
        <Route
          path="/ownervisit"
          element={
            <PrivateRoute
              allowedTypes={["wlasciciel"]}
              component={OwnerVisit}
            />
          }
        />
        <Route
          path="/admin"
          element={<PrivateRoute allowedTypes={["admin"]} component={Admin} />}
        />
        <Route
          path="/vet"
          element={
            <PrivateRoute allowedTypes={["weterynarz"]} component={Vet} />
          }
        />
        <Route
          path="/vetaccount"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetAccount}
            />
          }
        />
        <Route
          path="/vetlogout"
          element={
            <PrivateRoute allowedTypes={["weterynarz"]} component={VetLogout} />
          }
        />
        <Route
          path="/vetaddvisit"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetAddVisit}
            />
          }
        />
        <Route
          path="/vetconfirmaddvisit"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetConfirmAddVisit}
            />
          }
        />
        <Route
          path="/vetsuccess"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetSuccess}
            />
          }
        />
        <Route
          path="/vetvisit"
          element={
            <PrivateRoute allowedTypes={["weterynarz"]} component={VetVisit} />
          }
        />
        <Route
          path="/vetaddrecommendation"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetAddRecommendation}
            />
          }
        />
        <Route
          path="/vetconfirmaddrecommendation"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetConfirmAddRecommendation}
            />
          }
        />
        <Route
          path="/vetmodifyrecommendation"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetModifyRecommendation}
            />
          }
        />
        <Route
          path="/vetconfirmmodifyrecommendation"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetConfirmModifyRecommendation}
            />
          }
        />
        <Route
          path="/vetmodifyvisit"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetModifyVisit}
            />
          }
        />
        <Route
          path="/vetconfirmmodifyvisit"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetConfirmModifyVisit}
            />
          }
        />
        <Route
          path="/vetconfirmdeletevisit"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetConfirmDeleteVisit}
            />
          }
        />
        <Route
          path="/vetconfirmdeleterecommendation"
          element={
            <PrivateRoute
              allowedTypes={["weterynarz"]}
              component={VetConfirmDeleteRecommendation}
            />
          }
        />
      </Routes>
    </Router>
  );
}

// obsługa dostępów
function PrivateRoute({ allowedTypes, component: Component }) {
  const user = JSON.parse(localStorage.getItem("isLoggedIn"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !allowedTypes.includes(user.typ)) {
      navigate("/"); // jeśli użytkownik nie jest zalogowany lub nie ma odpowiednich uprawnień, przekieruj na strony głównej
    }
  }, [user, allowedTypes, navigate]);

  // zwracamy komponent tylko, jeśli użytkownik jest zalogowany i ma odpowiedni typ
  return user && allowedTypes.includes(user.typ) ? <Component /> : null;
}
