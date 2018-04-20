// Fetch decks, name, score, and cardcount
exports.FETCH_BOOKS = (userId, category) => `
  SELECT r.id AS rec_id, * from recommendations r
    INNER JOIN books b on r.item_id = b.id
    AND r.category = '${category}'
    AND r.user_id = '${userId}';
  `;

// // Fetch Deck
// exports.FETCH_DECK = deckname =>
//   `SELECT * FROM decks d WHERE d.deckname = '${deckname}'`;

// // Fetch cards in each deck
// exports.FETCH_DECK_CARDS = deckName => {
//   return `SELECT c.id, c.card_front, c.card_back, d.id AS deck_id FROM cards c
// 	INNER JOIN decks d ON c.deck_id = d.id
// 	WHERE d.deckname = '${deckName}';`;
// };

exports.ADD_REC = bookInfo => {
  let {
    title,
    description,
    imageUrl,
    link,
    recommender_id,
    user_id,
    firstName,
    lastName,
    item_id,
    category,
    comments,
    apiId
  } = bookInfo;

  let newDescription = description
    .join("\n")
    .split(" ")
    .slice(0, 100);
  newDescription.push("...");
  newDescription = newDescription.join(" ").replace(/\'/gi, "''");
  let newTitle = title.replace(/\'/gi, "''");
  let newComments = comments.replace(/\'/gi, "''");
  let recommender_name = firstName + " " + lastName;

  return `WITH book AS 
( INSERT INTO books(id, api_id, title, thumbnail_url, description, url) 
VALUES(default, '${apiId}', '${newTitle}', '${imageUrl}', '${newDescription}', '${link}') RETURNING id )
INSERT INTO recommendations 
(id, recommender_id, user_id, recommender_name, comment, item_id, date_added, category) 
VALUES(default, null, 3, '${recommender_name}', '${newComments}', 
        ( SELECT id from book ), default, '${category}');`;
};

// 	DELETE FROM decks d WHERE d.id = '${id}'
// 	RETURNING *
// `;

exports.DELETE_REC_TO_EXISTING_BOOK = ({
  userId,
  comment,
  id,
  recommender_name
}) =>
  `DELETE FROM recommendations r where r.item_id = '${id}' AND r.user_id = '${userId}' 
  AND r.comment = '${comment}' AND 
  r.recommender_name = '${recommender_name}' RETURNING *`;

// Add recommender and comments info to an existing book based on book_id
exports.ADD_REC_TO_EXISTING_BOOK = ({
  userId,
  category,
  id,
  firstName,
  lastName,
  comments
}) => `
	INSERT INTO recommendations(id, recommender_id, user_id, recommender_name, comment, item_id, date_added, category)
		VALUES(DEFAULT, null,'${userId}' , '${firstName +
  " " +
  lastName}', '${comments}', ${id}, default, '${category}')
		RETURNING *;
`;

// // Update Deck Quiz score
// exports.UPDATE_SCORE = ({ id, score }) => `
// 	UPDATE decks SET score = '${score}' where id = '${id}'
// `;
