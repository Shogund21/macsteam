export const usePrintHandler = () => {
  const handlePrint = () => {
    const printContent = document.querySelector('.print-content');
    if (!printContent) return;

    // Store the original styles
    const originalStyles = {
      background: document.body.style.background,
      margin: document.body.style.margin,
      padding: document.body.style.padding
    };

    // Create a new style element for print
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body { background: white; margin: 0; padding: 20px; }
        .print-content { display: block !important; }
        .print-content table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .print-content th, .print-content td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .print-content th { background-color: #f5f5f5; }
        .print-content h2 { margin-bottom: 20px; }
        @page { margin: 20px; }
      }
    `;
    document.head.appendChild(style);

    // Hide all other elements except print content
    const elements = document.body.children;
    const hiddenElements = Array.from(elements).map(element => {
      const wasHidden = (element as HTMLElement).style.display === 'none';
      if (!printContent.contains(element)) {
        (element as HTMLElement).style.display = 'none';
      }
      return { element, wasHidden };
    });

    // Trigger print
    window.print();

    // Cleanup: Remove the style element
    document.head.removeChild(style);

    // Restore original styles and visibility
    document.body.style.background = originalStyles.background;
    document.body.style.margin = originalStyles.margin;
    document.body.style.padding = originalStyles.padding;

    hiddenElements.forEach(({ element, wasHidden }) => {
      if (!wasHidden) {
        (element as HTMLElement).style.display = '';
      }
    });
  };

  return { handlePrint };
};