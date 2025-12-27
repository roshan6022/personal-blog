/* Paragraph numbering */

export function numberParagraphs(html: string) {
  const lines = html.split("\n");
  let count = 0;

  return lines
    .map((line) => {
      // Only number standalone paragraph tags (not inside other elements)
      if (line.trim().startsWith("<p>") && !line.includes("<h")) {
        count++;
        return line.replace(
          "<p>",
          `<p><span class="paragraph-marker">${String(count).padStart(
            2,
            "0"
          )}.</span> `
        );
      }
      return line;
    })
    .join("\n");
}
