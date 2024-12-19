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
import Owner from "./owner/Owner";
import { adminRoutes } from "./AdminRoutes";
import OwnerRecommendations from "./owner/OwnerRecommendations";
import Pets from "./owner/Pets";
import PetInfo from "./owner/PetInfo";
import OwnerAccount from "./owner/OwnerAccount";
import OwnerLogout from "./owner/OwnerLogout";
import OwnerVisit from "./owner/OwnerVisit";
import OwnerChooseAnimal from "./owner/OwnerChooseAnimal";
import Admin from "./admin/Admin";
import Vet from "./vet/Vet";
import VetAccount from "./vet/VetAccount";
import VetLogout from "./vet/VetLogout";
import VetAddVisit from "./vet/VetAddVisit";
import VetConfirmAddVisit from "./vet/VetConfirmAddVisit";
import VetSuccess from "./vet/VetSuccess";
import VetVisit from "./vet/VetVisit";
import AdminAddRecommendation from "./admin/recomenations/AdminAddRecommendation";
import AdminConfirmAddRecommendation from "./admin/recomenations/AdminConfirmAddRecommendation";
import AdminModifyRecommendation from "./admin/recomenations/AdminModifyRecommendation";
import AdminConfirmModifyRecommendation from "./admin/recomenations/AdminConfirmModifyRecommendation";
import VetModifyVisit from "./vet/VetModifyVisit";
import VetConfirmModifyVisit from "./vet/VetConfirmModifyVisit";
import VetConfirmDeleteVisit from "./vet/VetConfirmDeleteVisit";
import AdminConfirmDeleteRecommendation from "./admin/recomenations/AdminConfirmDeleteRecommendation";
import AdminLogout from "./admin/AdminLogout";
import AdminVisit from "./admin/visits/AdminVisit";
import AdminAddVisit from "./admin/visits/AdminAddVisit";
import AdminConfirmAddVisit from "./admin/visits/AdminConfirmAddVisit";
import AdminSuccess from "./admin/visits/AdminSuccess";
import AdminModifyVisit from "./admin/visits/AdminModifyVisit";
import AdminConfirmModifyVisit from "./admin/visits/AdminConfirmModifyVisit";
import AdminConfirmDeleteVisit from "./admin/visits/AdminConfirmDeleteVisit";
import VetAddRecommendation from "./vet/VetAddRecommendation";
import VetConfirmAddRecommendation from "./vet/VetConfirmAddRecommendation";
import VetModifyRecommendation from "./vet/VetModifyRecommendation";
import VetConfirmDeleteRecommendation from "./vet/VetConfirmDeleteRecommendation";
import VetConfirmModifyRecommendation from "./vet/VetConfirmModifyRecommendation";
import AdminPet from "./admin/pets/AdminPet";
import AdminAddPet from "./admin/pets/AdminAddPet";
import AdminModifyPets from "./admin/pets/AdminModifyPets";
import AdminConfirmAddPet from "./admin/pets/AdminConfirmAddPet";
import AdminConfirmModifyPet from "./admin/pets/AdminConfirmModifyPet";
import AdminConfirmDeletePet from "./admin/pets/AdminConfirmDeletePet";
import AdminUser from "./admin/users/AdminUser";
import AdminConfirmDeleteUser from "./admin/users/AdminConfirmDeleteUser";
import AdminModifyUser from "./admin/users/AdminModifyUser";
import AdminConfirmModifyUser from "./admin/users/AdminConfirmModifyUser";
import AdminAddUser from "./admin/users/AdminAddUser";
import AdminConfirmAddUser from "./admin/users/AdminConfirmAddUser";
import AdminPetInfo from "./admin/pets/AdminPetInfo";

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
          <p className="big-text">PupilMed</p>
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
          navigate("/owner");
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
          navigate("/owner");
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
              path="/admin"
              element={<PrivateRoute allowedTypes={["admin"]} component={Admin} />}
          />
          <Route
              path="/admin-visit"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminVisit}
                  />
              }
          />
          <Route
              path="/admin-add-visit"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminAddVisit}
                  />
              }
          />
          <Route
              path="/admin-confirm-add-visit"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmAddVisit}
                  />
              }
          />
          <Route
              path="/admin-modify-visit"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminModifyVisit}
                  />
              }
          />
          <Route
              path="/admin-confirm-modify-visit"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmModifyVisit}
                  />
              }
          />
          <Route
              path="/admin-confirm-delete-visit"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmDeleteVisit}
                  />
              }
          />
          <Route
              path="/admin-success"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminSuccess}
                  />
              }
          />
          <Route
              path="/admin-add-recommendation"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminAddRecommendation}
                  />
              }
          />
          <Route
              path="/admin-confirm-add-recommendation"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmAddRecommendation}
                  />
              }
          />
          <Route
              path="/admin-modify-recommendation"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminModifyRecommendation}
                  />
              }
          />
          <Route
              path="/admin-confirm-modify-recommendation"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmModifyRecommendation}
                  />
              }
          />
          <Route
              path="/admin-confirm-delete-recommendation"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmDeleteRecommendation}
                      />
                      }
                  />
          <Route
              path="/admin-add-pet"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminAddPet}
                  />
              }
          />
          <Route
              path="/admin-pets"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminPet}
                  />
              }
              />
          <Route
              path="/admin-modify-pet"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminModifyPets}
                  />
              }
          />
          <Route
              path="/admin-confirm-add-pet"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmAddPet}
                  />
              }
          />
          <Route
              path="/admin-confirm-modify-pet"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmModifyPet}
                  />
              }
          />
          <Route
              path="/admin-delete-pet"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmDeletePet}
                  />
              }
          />
          <Route
              path="/admin-users"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminUser}
                  />
              }
          />
          <Route
              path="/admin-delete-user"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmDeleteUser}
                  />
              }
          />
          <Route
              path="/admin-modify-user"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminModifyUser}
                  />
              }
          />
          <Route
              path="/admin-confirm-modify-user"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmModifyUser}
                  />
              }
          />
          <Route
              path="/admin-add-user"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminAddUser}
                  />
              }
          />
          <Route
              path="/admin-confirm-add-user"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminConfirmAddUser}
                  />
              }
          />
          <Route
              path="/admin-pets-info"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminPetInfo}
                  />
              }
          />
          {/*<Route*/}
          {/*    path="/admin-recommendations"*/}
          {/*    element={*/}
          {/*        <PrivateRoute*/}
          {/*            allowedTypes={["admin"]}*/}
          {/*            component={AdminRecommendations}*/}
          {/*        />*/}
          {/*    }*/}
          {/*/>*/}
          <Route
              path="/admin"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={Admin} />}
          />
          <Route
              path="/admin-logout"
              element={
                  <PrivateRoute
                      allowedTypes={["admin"]}
                      component={AdminLogout} />}
          />
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
        {/*<Route*/}
        {/*  path="/ownerrecommendations"*/}
        {/*  element={*/}
        {/*    <PrivateRoute*/}
        {/*      allowedTypes={["wlasciciel"]}*/}
        {/*      component={OwnerRecommendations}*/}
        {/*    />*/}
        {/*  }*/}
        {/*/>*/}
        <Route
            path="/pets"
            element={
              <PrivateRoute
                  allowedTypes={["wlasciciel"]}
                  component={Pets}
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
            path="/pets/info"
            element={
              <PrivateRoute
                  allowedTypes={["wlasciciel"]}
                  component={PetInfo}
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
