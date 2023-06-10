const cleanUp = (data) => {
  let cleaned = [];

  const capitalize = (unformatted) => {
    return unformatted.charAt(0).toUpperCase() + unformatted.slice(1);
  };

  const formatData = (unformatted, parameter) => {
    if (!unformatted || unformatted === "uncertain") {
      return `${capitalize(parameter)} unknown`;
    } else {
      return capitalize(unformatted);
    }
  };

  const formatDate = (unformatted) => {
    if (!unformatted) return "";
    let [year, month, day] = unformatted.split('-');
    let dateObject = new Date(year, month - 1, day);
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    return dateObject.toLocaleString('en-US', options);
  };

  data.forEach((cv) => {
    let cleanData = {
      id: cv.id,
      english: cv.en,
      latin: `${capitalize(cv.sp)} ${cv.ssp}`,
      exactLocation: capitalize(cv.loc),
      demographics: `${formatData(cv.stage, "Age")}, ${formatData(cv.sex, "Sex")}`,
      src: cv.file,
      date: `Recorded on ${formatDate(cv.date)}`,
      recordist: `by ${cv.rec}`,
      notes: cv.rmk
    };
    cleaned.push(cleanData);
  });

  return cleaned;
};

export default cleanUp;