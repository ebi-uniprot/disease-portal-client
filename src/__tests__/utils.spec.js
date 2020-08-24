import { formatTextWithPubmeds } from "../utils";

const text =
  "Something (PubMed:12475894). Something  (PubMed:12475895, PubMed:12475896)";

const transformedText =
  'Something (PubMed:<a href="//www.uniprot.org/citations/12475894">12475894</a>). Something  (PubMed:<a href="//www.uniprot.org/citations/12475895">12475895</a>, PubMed:<a href="//www.uniprot.org/citations/12475896">12475896</a>)';

describe("It should test utils", () => {
  it("Should split the text and create links", () => {
    const splitText = formatTextWithPubmeds(text);
    expect(splitText).toBe(transformedText);
  });
});
