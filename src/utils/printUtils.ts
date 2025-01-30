export const printImage = (imageUrl: string, title: string) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>${title}</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #fff;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              display: block;
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" alt="Printed Image">
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
};