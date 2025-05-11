/**
 * fetchModel - Fetch a model from the backend API.
 *
 * @param {string} url - The URL endpoint to issue the GET request.
 * @returns {Promise<object>} - The fetched data from the backend.
 */
async function fetchModel(url) {
  try {
    const response = await fetch(`http://localhost:8081/api${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("fetchModel error:", error);
    return null;
  }
}

export default fetchModel;
