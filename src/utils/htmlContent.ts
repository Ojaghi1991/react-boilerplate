export default (
  content: string,
): string => {
  const htmlContent = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      </head>
      <body>
        <div id="react-view">${content}</div>
        <script src="build/bundle.js"></script>
      </body>
    </html>
  `;

  return htmlContent;
};
