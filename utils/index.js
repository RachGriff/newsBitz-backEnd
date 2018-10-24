exports.formatArticles = (articlesData, topicDocs, userDocs) => {
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
