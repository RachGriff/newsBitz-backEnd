exports.formatArticles = (topicDocs, userDocs, articlesData) => {
  return articlesData.map(article => {
    return {
      title: article.title,
      body: article.body,
      votes: article.votes,
      created_at: article.created_at,
      belongs_to: article.topic,
      created_by: userDocs.find(user => user.username === article.created_by)
        ._id
    };
  });
};

exports.formatComments = (topicDocs, userDocs, articleDocs, commentsData) => {
  return commentsData.map(comment => {
    return {
      ...comment,
      belongs_to: articleDocs.find(
        article => article.title === comment.belongs_to
      )._id,
      created_by: userDocs.find(user => user.username === comment.created_by)
        ._id
    };
  });
};

// a created_by property that references a user's mongo _id and
// a belongs_to property that references the specific article's mongo _id.
