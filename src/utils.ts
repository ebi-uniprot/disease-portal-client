export const formatTextWithPubmeds = (text: string) => {
  const regex = /(PubMed:\d{7,8})/g;
  const matches = text.split(regex);
  return matches
    .map((match) => {
      if (match.startsWith("PubMed")) {
        return match.replace(
          /PubMed:(\d{7,8})/,
          'PubMed:<a href="//www.uniprot.org/citations/$1">$1</a>'
        );
      } else return match;
    })
    .join("");
};
