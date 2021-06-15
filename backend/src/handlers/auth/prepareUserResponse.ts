export default async user => {
  const { _id, email, name, categories, forks } = user;

  return {
    email,
    name,
    id: _id,

    forks,
    categories,
  };
};
