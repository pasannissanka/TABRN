import marked from 'marked';
import { ParsedBookmarkContent } from '../../modules/workspace-entry/types/bookmark.type';

const tag = {
  name: 'tag',
  level: 'inline', // Is this a block-level or inline-level tokenizer?
  tokenizer(src: string, _) {
    const rule = /#(?![0-9_]+\b)([a-zA-Z0-9_]{1,})/; // Regex for the complete token
    const match = rule.exec(src);
    // console.log('match', match);
    if (match) {
      const token = {
        // Token to generate
        type: 'tag', // Should match "name" above
        raw: match[0], // Text to consume from the source
        text: match[1].trim(), // Additional custom properties
      };
      // this.lexer.inline(token.text, token.tokens); // Queue this data to be processed for inline tokens
      return token;
    }
    return;
  },
  // renderer(token) {
  //   return `<dl>${this.parser.parseInline(token.tokens)}\n</dl>`; // parseInline to turn child tokens into HTML
  // }
};

export const parseBookmarkDetails = (input: string): ParsedBookmarkContent => {
  marked.use({ extensions: [tag] });

  const tokens = marked.lexer(input);
  const titles = tokens.filter((token) => token.type === 'heading') as any[];
  const desc = tokens.filter((token) => token.type === 'paragraph') as any[];
  const tagTokens = desc.map((para: any) =>
    para?.tokens.filter((token: any) => token.type === 'tag')
  );

  // console.log(titles, desc, tagTokens);

  let title: string;
  if (titles.length >= 1) {
    // More than one headings found
    const headingLvl1 = titles.filter((v) => v.depth === 1);
    if (headingLvl1.length >= 1) {
      // Level 1 heading(s) found
      title = headingLvl1[0].text;
    } else {
      // No level one headings
      title = titles[0].text;
    }
  } else {
    // No heading found
    title = '';
  }

  let description = desc.reduce((prev, cur) => {
    return prev + cur.text;
  }, '');

  let tags: Set<string> = tagTokens.reduce((prev: Set<string>, cur: any[]) => {
    cur.filter((v) => !prev.has(v.text)).forEach((v) => prev.add(v.text));
    return prev;
  }, new Set<string>());

  return {
    title,
    description,
    tags: [...tags],
  };
};
