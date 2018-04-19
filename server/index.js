const { validateQuery } = require("../database/index");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const {
  promiseQuery,
  insertQuery,
  updateQuery,
  deleteQuery
} = require("../database/index");
const { FETCH_BOOKS, ADD_BOOK, ADD_REC } = require("../database/queries");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../client/dist`));

app.get("/u/:userId/:category", (req, res) => {
  const { userId, category } = req.params;
  promiseQuery(FETCH_BOOKS(userId, category))
    .then(books => {
      const parsedBooks = books.reduce((bookItems, recommendation) => {
        const {
          rec_id,
          recommender_id,
          user_id,
          recommender_name,
          comment,
          item_id,
          date_added,
          title,
          thumbnail_url,
          description,
          url
        } = recommendation;

        const recEntry = {
          recommender_id,
          recommender_name,
          comment,
          date_added
        };

        const book = {
          title,
          thumbnail_url,
          description,
          url
        };

        console.log(bookItems);

        if (item_id in bookItems) {
          bookItems[item_id].recommendations.push(recEntry);
        } else {
          bookItems[item_id] = {
            book,
            recommendations: [recEntry]
          };
        }

        return bookItems;
      }, {});

      console.log("parsedBooks = ", parsedBooks);

      res.json(parsedBooks);
      res.end();
    })
    .catch(err => res.end("404", err));
});

app.post("/u/:userId/:category", (req, res) => {
  const { userId, category } = req.params;
  //check if the book already exists (user_id + book_id)
  validateQuery(
    `select exists(select 1 from recommendations r inner join books b on b.id = r.item_id where r.user_id=${
      req.body.userId
    } AND b.api_id=${req.body.id});`
  ).then(exist => {
    if (exist[0][0].exists) {
      res.json({ alreadyExist: true });
    } else {
      insertQuery(ADD_REC(req.body))
        .then(sqlResponse => res.json({ inserted: "success" }))
        .catch(err => console.log(err));
    }
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(3000, () => {
  console.log("listening on port 3000!");
});

// {
//   "rec_id": 6,
//   "id": 2,
//   "recommender_id": null,
//   "user_id": 3,
//   "recommender_name": "Bob",
//   "comment": "read this",
//   "item_id": 2,
//   "date_added": "2018-04-10T21:03:13.518Z",
//   "category": "books",
//   "title": "Harry Potter",
//   "thumbnail_url": "somesite",
//   "description": "harry potter",
//   "url": "potterlink"
// }
