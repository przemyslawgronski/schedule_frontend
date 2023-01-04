import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetRegistered, login } from "../../features/user";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, isAuthenticated, registered } = useSelector(state => state.user)

    // Można kwestionować, czy jest potrzebne trzymanie tego w state, skoro nic z tym nie robimy
    // (np. nie przeprowadzamy walidacji poprawności etc.). W tej chwili pola formularza "email" i "password"
    // to "controlled-inputs", czyli React (poprzez state) jest odpowiedzialny za przechowywanie i aktualizowanie
    // ich wartości: <input {...} value={naszaWartosc} />. Trochę niepotrzebnie obciążamy Reacta tymi zadaniami,
    // skoro nie potrzebujemy mieć cały czas dostępu do najświeższych wartości - potrzebne są tylko przy submicie.
    // Aktualizowanie wartości kosztuje obliczenia i niepotrzebne re-rendery. Lepiej pozostawić to zadanie
    // natywnym mechanizmom przeglądarki, w ogóle nie trzymać tego w state.
    // Przykładowe alternatywne rozwiązania: https://bobbyhadz.com/blog/react-get-form-input-value-on-submit
    // Nie jest to oczywisty błąd, myślę, że wielu programistom odpowiadałoby to rozwiązanie,
    // zauważam jednak jakieś pole do optymalizacji.
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    useEffect(()=>{
      if(registered) dispatch(resetRegistered());
    }, [dispatch, registered]);

    // Destructure object to variables to use them directly
    const {email, password} = formData;
  
    // Dobrze byłoby dodać jakiegoś rodzaju opóźnienie czy dławienie (throttling),
    // żeby ta funkcja nie odpalała się za każdym naciśnięciem klawisza podczas pisania,
    // co powoduje niepotrzebnie częste re-rendery.
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
  
    const onSubmit = e => {
      e.preventDefault();

      dispatch(login({email, password}));
    }

    // Przesunąć wyżej. Nie ma sensu wykonywać niepotrzebnie niektórych operacji,
    // jeśli i tak użytkownik jest już zalogowany i zostanie natychmiast 
    // przekierowany gdzie indziej.
    if (isAuthenticated) return <Navigate to='/dashboard' />

    return (
      <>
          <h1>Log into your account</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' onChange={onChange} value={email} required />
              <label htmlFor="password">Password</label>
              <input type='password' name='password' onChange={onChange} value={password} required />
            </div>
            { loading ? ("loading") : (<button> Login </button>) }
          </form>
      </>
    )
  }
  
  export default LoginPage;