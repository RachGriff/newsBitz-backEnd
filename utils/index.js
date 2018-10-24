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

exports.formatComments = (commentsData, articleDocs, topicDocs, userDocs) => {
  return commentsData.map(comment => {
    console.log(">>>", articleDocs, "<<<<<");
    return {
      ...comment,
      belongs_to: articleDocs.find(
        article => article.title === comment.belongs_to
      )
      //   created_by: userDocs.find(user => user.username === comment.created_by)
      //     ._id
      // };
    };
  });
};

// a created_by property that references a user's mongo _id and
// a belongs_to property that references the specific article's mongo _id.
