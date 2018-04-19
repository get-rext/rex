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
    id
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
VALUES(default, '${id}', '${newTitle}', '${imageUrl}', '${newDescription}', '${link}') RETURNING id )
INSERT INTO recommendations 
(id, recommender_id, user_id, recommender_name, comment, item_id, date_added, category) 
VALUES(default, null, 3, '${recommender_name}', '${newComments}', 
        ( SELECT id from book ), default, '${category}');`;
};

// 	DELETE FROM decks d WHERE d.id = '${id}'
// 	RETURNING *
// `;

// // Add Card to DeckID
// exports.ADD_CARD = ({ cardFront, cardBack, deckId }) => `
// 	INSERT INTO cards(id, card_front, card_back, deck_id)
// 		VALUES(DEFAULT, '${cardFront}', '${cardBack}', ${deckId})
// 		RETURNING *
// `;

// // Update Deck Quiz score
// exports.UPDATE_SCORE = ({ id, score }) => `
// 	UPDATE decks SET score = '${score}' where id = '${id}'
// `;
