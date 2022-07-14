const express = require("express");

const app = express();


const hotels = [
  {
    mallorca: [
      {
        name: "Hotel Playa",
        stars: 3,
      },
      {
        name: "Hotel Playa Deluxe",
        stars: 5,
      },
    ],
    tyrol: [
      {
        name: "Hotel Mountain Budget",
        stars: 2,
      },
      {
        name: "Hotel Mountain",
        stars: 3,
      },
      {
        name: "Hotel Tyrol Deluxe",
        stars: 5,
      },
    ],
  },
];
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/hotels", (req, res) => {
  res.send(hotels);
});

app.get("/hotels/:stars", (req, res) => {
  let starCount = req.params.stars;
  console.log(starCount);
  let filteredList = [];
  hotels.forEach((hotel) => {
    const keys = Object.keys(hotel);
    keys.forEach((i) => {
      console.log(hotel[i]);
      hotel[i].forEach((k) => {
        console.log(k.stars);
        if (k.stars == starCount) {
          const formattedReturnData = {
            ...k,
            destination: i,
          };
          filteredList.push(formattedReturnData);
        }
      });
    });
  });
  console.log(filteredList);
  if (filteredList.length == 0) {
    return res.status(404).send("No hotels found");
  } else {
    return res.send(filteredList);
  }
});

const port = process.env.PORT || 3003;
app.listen(3003, () => console.log(`Listening on port ${port}!`));
