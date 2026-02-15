export function normalizeWord(word: string) {
  return word.toLowerCase().replaceAll(/[^a-z']/g, "").trim();
}

export function countEnglishWords(text: string) {
  const matches = text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g);
  return matches ? matches.length : 0;
}

export function getSelectionText(): { text: string; rect: DOMRect | null } {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) {
    return { text: "", rect: null };
  }
  const text = sel.toString();
  const range = sel.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (rect && rect.width === 0 && rect.height === 0) {
    return { text, rect: null };
  }
  return { text, rect };
}

function getCaretRangeFromPoint(x: number, y: number): Range | null {
  const doc = document as unknown as {
    caretRangeFromPoint?: (x: number, y: number) => Range;
    caretPositionFromPoint?: (
      x: number,
      y: number,
    ) => { offsetNode: Node; offset: number } | null;
  };

  if (typeof doc.caretRangeFromPoint === "function") {
    return doc.caretRangeFromPoint(x, y);
  }
  if (typeof doc.caretPositionFromPoint === "function") {
    const pos = doc.caretPositionFromPoint(x, y);
    if (!pos) return null;
    const range = document.createRange();
    range.setStart(pos.offsetNode, pos.offset);
    range.setEnd(pos.offsetNode, pos.offset);
    return range;
  }
  return null;
}

export function getWordAtPoint(x: number, y: number): { word: string; rect: DOMRect | null } {
  const range = getCaretRangeFromPoint(x, y);
  if (!range) {
    return { word: "", rect: null };
  }
  const node = range.startContainer;
  if (!node || node.nodeType !== Node.TEXT_NODE) {
    return { word: "", rect: null };
  }
  const text = node.textContent ?? "";
  const offset = range.startOffset;
  if (!text || offset < 0 || offset > text.length) {
    return { word: "", rect: null };
  }

  const isWordChar = (c: string) => /[A-Za-z']/.test(c);
  let start = offset;
  let end = offset;
  while (start > 0 && isWordChar(text[start - 1] ?? "")) start--;
  while (end < text.length && isWordChar(text[end] ?? "")) end++;
  const word = text.slice(start, end);
  if (!word || !/[A-Za-z]/.test(word)) {
    return { word: "", rect: null };
  }

  const wordRange = document.createRange();
  wordRange.setStart(node, start);
  wordRange.setEnd(node, end);
  const rect = wordRange.getBoundingClientRect();
  return { word, rect };
}
