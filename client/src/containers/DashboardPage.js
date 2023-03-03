import { useSelector } from "react-redux";

const DashboardPage = () => {

  const { user, loading } = useSelector(state => state.user)

  return (
    <>
      {loading || user === null ? (
        <span>Ładowanie</span>
      ) : (
        <>
          <h1>Dane użytkownika</h1>
          <ul>
            <li><b>Imię:</b> {user?.first_name}</li>
            <li><b>Nazwisko:</b> {user?.last_name}</li>
            <li><b>Email:</b> {user?.email}</li>
          </ul>
        </>
      )}
    </>
  )
}

export default DashboardPage;