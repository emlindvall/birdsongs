const fetchSingle = async (id) => {
  let url = `https://xeno-canto.org/api/2/recordings?query=nr:${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    } else {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
};

export default fetchSingle;