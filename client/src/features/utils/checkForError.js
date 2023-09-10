import { logout } from "../user";

export async function checkForError(fetchResponse, dispatch) {
  // Handle error
  if (!fetchResponse.ok) {

    // Logout if unauthorized
    if (fetchResponse.status === 401) dispatch(logout());

    // Get error details
    const errorDetails = await fetchResponse.json();
    
    throw new Error(`${fetchResponse.status}: ${errorDetails?.message || fetchResponse.statusText}`);
  }
}