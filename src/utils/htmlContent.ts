export default (
  content: string,
  extractor: Record<string, any>,
): string => {
  const htmlContent = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
        </head>
      <body>
        <div id="react-view">${content}</div>
        ${extractor.getScriptTags()}
      </body>
    </html>
  `;

  return htmlContent;
};
