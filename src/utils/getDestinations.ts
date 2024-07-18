import { IOptions, ISuggestion } from "../types/typings";

const getDestinations = async () => {
  // const options: IOptions = {
  //   method: "GET",
    // headers: {
    //   "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
    //   "X-RapidAPI-Host": "hotels4.p.rapidapi.com",
    // },
  // };
  let url = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(url+"/get-destinations").then(
                        (res) => res.json()
                      );

  // const json = await data.json();

  // const suggestionsFormatted = json.sr.map((suggestion: ISuggestion) => ({
  //   shortName: suggestion.regionNames.shortName,
  //   displayName: suggestion.regionNames.displayName,
  //   id: suggestion.gaiaId,
  //   type: suggestion.type,
  // }));


  // setData(suggestionsFormatted);
  return data;
};

export default getDestinations;
