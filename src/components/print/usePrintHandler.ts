export const usePrintHandler = () => {
  const handlePrint = () => {
    const printContent = document.querySelector('.print-content');
    if (!printContent) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get the current document's stylesheets
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n');
        } catch (e) {
          return '';
        }
      })
      .join('\n');

    // Create the print window content
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print View</title>
          <style>
            ${styles}
            @media print {
              body { 
                padding: 20px;
                margin: 0;
                background: white;
              }
              table { 
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th, td { 
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th { 
                background-color: #f5f5f5;
              }
              h2 { 
                margin-bottom: 20px;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    // Wait for content to load then print
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      // Close the print window after printing
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  };

  return { handlePrint };
};