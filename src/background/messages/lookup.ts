import type { PlasmoMessaging } from "@plasmohq/messaging"
import type { WordStatusDTO } from "./changeWordStatus";

export interface KrDictEntryDTO {
  headword: string;
  reading: string | null;
  part_of_speech: string;
  deinflection_rule: string | null;
  definition_full: string;
  sequence_number: number;
  hanja: string | null;
  tl_definitions: {
    translation: string;
    definition: string;
  }[],
  stars: number;
  frequency: number | null;
}

export type LookupDTO = { dictEntry: KrDictEntryDTO, status: WordStatusDTO };
export type LookupResponse = Record<string, Array<LookupDTO>>;

async function getLookup(word: string): Promise<LookupResponse> {
  return fetch(`http://127.0.0.1:3000/lookup/${word}`)
    .then(res => res.json()) // TODO error handling
}

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = await getLookup(req.body.word);

  res.send({
    message
  })
}

export default handler