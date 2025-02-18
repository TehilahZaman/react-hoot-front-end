const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/hoots`;

// the argument 'hootId' is coming from the url parameter passed in through the Link and taken with useParams
async function show(hootId) {
  try {
    const response = await fetch(`${BASE_URL}/${hootId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function index() {
  try {
    // the authorization header sends the token
    // verfiyToken middleware in the server, decodes the token
    const response = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

export { index, show };
