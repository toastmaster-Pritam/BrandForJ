import { jsPDF } from "jspdf";

export async function generatePdf(imageUrls: string[],pdfName:string) {
  // Initialize the PDF in landscape mode
  const pdf = new jsPDF({
    orientation: "landscape", // Set orientation to landscape
    unit: "mm", // Measurement unit in millimeters
    format: "a4", // A4 size
  });

  // A4 dimensions in millimeters (landscape)
  const pageWidth = 297;
  const pageHeight = 210;

  for (let i = 0; i < imageUrls.length; i++) {
    const imgData = await fetch(imageUrls[i]).then((res) => res.blob());
    const img = await createImageBitmap(imgData);

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);

    const imgBase64 = canvas.toDataURL("image/png");

    // Calculate the aspect ratio
    const imgAspectRatio = img.width / img.height;
    const pageAspectRatio = pageWidth / pageHeight;

    let drawWidth, drawHeight;
    if (imgAspectRatio > pageAspectRatio) {
      // Image is wider than the page
      drawWidth = pageWidth - 20; // Leave some margin
      drawHeight = drawWidth / imgAspectRatio;
    } else {
      // Image is taller than or matches the page
      drawHeight = pageHeight - 20; // Leave some margin
      drawWidth = drawHeight * imgAspectRatio;
    }

    // Calculate margins to center the image
    const xOffset = (pageWidth - drawWidth) / 2;
    const yOffset = (pageHeight - drawHeight) / 2;

    if (i > 0) pdf.addPage();

    // Add the image
    pdf.addImage(imgBase64, "PNG", xOffset, yOffset, drawWidth, drawHeight);

    // Add page number at the bottom center of the page
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10); // Adjust font size for better visibility
    pdf.setTextColor(50, 50, 50); // Set text color for better contrast
    pdf.text(
      `Page ${i + 1} of ${imageUrls.length}`,
      pageWidth / 2,
      pageHeight - 15, // Position it above the margin (15 mm from the bottom)
      { align: "center" }
    );
  }


  const blobPdf=new Blob([pdf.output('blob')],{type:"application/pdf"})
  const blobUrl=URL.createObjectURL(blobPdf)

  window.open(blobUrl,'_system','location=yes');
  

  // Save the PDF
  pdf.save(`${pdfName}.pdf`);

  

 
}
