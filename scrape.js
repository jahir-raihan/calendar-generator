axios({url:'https://www.timeanddate.com/calendar/?year=2023&country=233'})
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });