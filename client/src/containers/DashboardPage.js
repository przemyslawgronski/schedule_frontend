import { useSelector } from "react-redux";

const DashboardPage = () => {

  const { user, loading } = useSelector(state => state.user)

  return (
    <>
      {loading || user === null ? (
        <span>loading</span>
      ) : (
        <>
          <h1>Dashboard</h1>
          <p> User details:</p>
          <ul>
            <li>First Name: {user?.first_name}</li>
            <li>Last Name: {user?.last_name}</li>
            <li>Email: {user?.email}</li>
          </ul>
        </>
      )}
    </>
  )
}

export default DashboardPage;