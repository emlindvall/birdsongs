const getData = async (url) => {
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
    console.log(error)
    
  }
};

export default getData;