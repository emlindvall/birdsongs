const janitor = (data) => {

  const capitalize = (unformatted) => {
    let formatted = unformatted.charAt(0).toUpperCase() + unformatted.slice(1);
    return formatted;
  }

  const formatData = (unformatted, parameter) =>  {
    if (!unformatted || unformatted === "uncertain") {
      return `${capitalize(parameter)} unknown`;
    } else {
      return capitalize(unformatted);
    }
  }

  const formatDate = (unformatted)  =>  {
    if (!unformatted) return "";
    let dateObject = new Date(unformatted);
    let month = dateObject.toLocaleString('default', { month: 'long' });
    let day = unformatted.slice(8);
    let year = unformatted.slice(0,4);
    return `${month} ${day}, ${year}`;
  }
  
  const cleanUp = data.reduce((acc, cv) => {
    const getCleanData = cv.forEach((cv)  =>  {
      acc["id"] = cv.id;
      acc["english"] = cv.en;
      acc["latin"] = `${capitalize(cv.sp)} ${cv.ssp}`;
      acc["exactLocation"] = `${capitalize(cv.loc)}`;
      acc["demographics"] = `${formatData(cv.stage, "Age")}, ${formatData(cv.sex, "Sex")}`
      acc["src"] = cv.file;
      acc["date"] = `Recorded on ${formatDate(cv.date)}`;
      acc["recordist"] = `by ${cv.rec}`;
      acc["notes"] = cv.rmk;
      return acc;
    }, [{}])
    })

  return cleanUp;
}

export default janitor;