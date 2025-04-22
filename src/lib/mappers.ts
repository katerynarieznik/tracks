export const getGenresDropdownOptions = (genres: string[] = []) => {
  return genres.map((genre) => ({
    label: genre,
    value: genre,
  }));
};
