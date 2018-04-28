// FETCH BOOKS AND RECOMMENDATIONS
exports.FETCH_BOOKS = (userId, category) => `
  SELECT r.id AS rec_id, * from recommendations r
    INNER JOIN books b on r.item_id = b.id
    AND r.category = '${category}'
    AND r.user_id = '${userId}';
  `;

// DELETE RECOMMENDATIONS
// Note: Doesn't delete the actual item from db, just recommendations
exports.DELETE_BOOK = ({ userId, category, itemId }) => `
  DELETE FROM recommendations r
    WHERE r.user_id='${userId}'
    AND r.category='${category}'
    AND r.item_id='${itemId}';
`;

// CHECK IF BOOK IN DB, return id or null
exports.CHECK_BOOK = ({ apiId }) => `
  SELECT id FROM books b WHERE b.api_id = ${apiId};
`;

// CHECKS IF USER HAS RECOMMENDATION FOR A BOOK
exports.CHECK_EXISTING_REC = ({ userId, apiId }) => `
  SELECT EXISTS(SELECT 1 FROM recommendations r 
    INNER JOIN books b ON b.id = r.item_id 
    WHERE r.user_id=${userId} 
    AND b.api_id=${apiId});`;

// UPDATE RECOMMENDATIONS - status and rating
exports.UPDATE_RECOMMENDATION = ({
  userId, category, itemId, status, rating,
}) => `
  UPDATE recommendations r 
  SET status = '${status}', user_rating='${rating}' 
  WHERE r.user_id='${userId}'
  AND r.category='${category}'
  AND r.item_id='${itemId}';
`;

// ADD NEW RECOMMENDATION AND BOOK TO DB
exports.ADD_REC_AND_BOOK = (bookInfo) => {
  const {
    title,
    description,
    imageUrl,
    link,
    recommender_id,
    userId,
    firstName,
    lastName,
    item_id,
    category,
    comments,
    apiId,
  } = bookInfo;

  let newDescription = description
    .join('\n')
    .split(' ')
    .slice(0, 100);
  newDescription.push('...');
  newDescription = newDescription.join(' ').replace(/\'/gi, "''");
  const newTitle = title.replace(/\'/gi, "''");
  const newComments = comments.replace(/\'/gi, "''");
  const recommender_name = `${firstName} ${lastName}`;

  return `WITH book AS 
( INSERT INTO books(id, api_id, title, thumbnail_url, description, url) 
VALUES(default, '${apiId}', '${newTitle}', '${imageUrl}', '${newDescription}', '${link}') RETURNING id )
INSERT INTO recommendations 
(id, recommender_id, user_id, recommender_name, comment, item_id, date_added, category) 
VALUES(default, null, ${userId}, '${recommender_name}', '${newComments}', 
        ( SELECT id from book ), default, '${category}');`;
};
// ADD NEW RECOMMENDATION WITH BOOK ID
exports.ADD_REC = (recommendationInfo) => {
  const {
    userId, firstName, lastName, bookId, category, comments,
  } = recommendationInfo;

  const newComments = comments.replace(/\'/gi, "''");
  const recommenderName = `${firstName} ${lastName}`;

  return `
  INSERT INTO recommendations(id, recommender_id, user_id, recommender_name, comment, item_id, date_added, category) 
  VALUES(DEFAULT, NULL, ${userId}, '${recommenderName}', '${newComments}', '${bookId}', DEFAULT, '${category}');
  `;
};

// Add recommender and comments info to an existing book based on book_id
exports.ADD_REC_TO_EXISTING_BOOK = ({
  userId, category, id, firstName, lastName, comments,
}) => `
INSERT INTO recommendations(id, recommender_id, user_id, recommender_name, comment, item_id, date_added, category)
VALUES(DEFAULT, null,'${userId}' , '${`${firstName} ${lastName}`}', '${comments}', ${id}, default, '${category}')
  RETURNING *;
  `;

exports.FIND_USER = username => `SELECT id, password, first_name, last_name FROM users
    WHERE username = '${username}';`;
exports.ADD_USER = (username, passwordHash, firstName, lastName) => ` 
  INSERT INTO users (id, username, password, first_name, last_name)
  VALUES (DEFAULT, '${username}', '${passwordHash}', '${firstName}', '${lastName}')
  RETURNING id;`;
