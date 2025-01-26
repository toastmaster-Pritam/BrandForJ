interface BrandGuidelineArgs {
  brandName: string;
  year?: string;
  pages: number;
  brandInfo?: string;
  brandTone?: string;
  brandColors: string;
  imageryStyle?: string;
  type: string;
  website_url?: string;
}

interface BrandInfographicsArgs {
  brandName: string;
  year?: string;
  pages: number;
  brandInfo?: string;
  targetAudience: string;
  brandColors: string;
  bussinessMode: string;
  achievements: string;
  type: string;
  website_url?: string;
}

interface BrandLogoArgs {
  brandName: string;
  brandIdentity: string;
  brandColors: string;
}

export function generateBrandGuideline({
  brandName,
  year,
  pages,
  brandInfo,
  brandColors,
  brandTone,
  imageryStyle,
  type,
  website_url
}: BrandGuidelineArgs): string {
  const prompt = `
      Generate a JSON structure for a ${
        pages || "10"
      }-page ${type} for ${brandName}.Do not exceed number of pages mentioned! 
      Each key should represent a page (e.g., "page1", "page2", etc.), and the value should contain a detailed description of what to include on that page.
      
      Descriptions should be specific, visually detailed, and aligned with ${brandName}'s unique brand identity (${
    brandInfo ? brandInfo : ""
  }, ${brandTone ? brandTone : ""}, ${brandColors}, ${
    imageryStyle ? imageryStyle : ""
  }).${
    website_url &&
    `Also it should be like the provided reference website:${website_url}.`
  } Include elements like graphs, charts, and clear alignments where applicable.

      Ensure the structure follows like this example format:
      {
        "page1": "Detailed description for page 1",
        "page2": "Detailed description for page 2",
        ...
        "page${pages || "10"}": "Detailed description for page ${pages || "10"}"
      }

      Each page should follow a structured approach like the following example:
      Page 1: Cover Page - Display the brand logo, bold backgrounds, and title '${brandName} Brand Guidelines 2025'.
      Page 2: Brand Overview - Mission, vision, and core values, designed with a split layout and icons.
      Page 3: Logo Usage - Examples of correct and incorrect logo use.
      Page 4: Color Palette - Primary and secondary colors with hex codes and a usage chart.
      Page 5: Typography - Primary and secondary fonts, along with hierarchy examples.
      Page 6: Imagery Guidelines - Preferred photo styles, dynamic angles, and image do's and don'ts.
      Page 7: Graphical Elements - Shapes, icons, and a bar chart comparing digital engagement.
      Page 8: Tone of Voice - A flowchart explaining the brand's voice (e.g., professional, energetic).
      Page 9: Sustainability Commitment - Key eco-friendly initiatives with a progress graph.
      Page 10: Contact Information - Website, social media, QR code for brand assets.
      Remember, it is just an example,you do not need to generate all description till page 10, you must wrap it up within the user specified page count.
      Also the output format should always be page<no>:"page description string", never try to nest further objects out of it.
      Output should be formatted as valid JSON with precise descriptions to generate visually compelling brand guideline infographics. 
      Keep the tone modern, clean, and professional.
    `;

  return prompt;
}

export function generateInfographics({
  brandName,
  year,
  pages,
  brandInfo,
  brandColors,
  targetAudience,
  bussinessMode,
  achievements,
  type,
  website_url
}: BrandInfographicsArgs): string {
  const prompt = `
      Generate a JSON structure for a ${
        pages || "10"
      }-page Brand ${type} for ${brandName}.Do not exceed number of pages mentioned! 
      Each key should represent a page (e.g., "page1", "page2", etc.), and the value should contain a detailed description of what to include on that page.
      
      Descriptions should be specific, visually detailed, and aligned with ${brandName}'s unique brand identity (${brandInfo}, ${targetAudience}, ${brandColors}, ${bussinessMode},${achievements}).${
    website_url &&
    `Also it should be like the provided reference website:${website_url}.`
  } Include elements like graphs, charts, and clear alignments where applicable.

      Ensure the structure follows like this example format:
      {
        "page1": "Detailed description for page 1",
        "page2": "Detailed description for page 2",
        ...
        "page${pages || "10"}": "Detailed description for page ${pages || "10"}"
      }

      Each page should follow a structured approach like the following example:
      Page 1: Cover Page - Display the brand logo, bold backgrounds, and title '${brandName} Brand Guidelines 2025'.
      Page 2: Brand Overview - Mission, vision, and core values, designed with a split layout and icons.
      Page 3: Logo Usage - Examples of correct and incorrect logo use.
      Page 4: Color Palette - Primary and secondary colors with hex codes and a usage chart.
      Page 5: Typography - Primary and secondary fonts, along with hierarchy examples.
      Page 6: Imagery Guidelines - Preferred photo styles, dynamic angles, and image do's and don'ts.
      Page 7: Graphical Elements - Shapes, icons, and a bar chart comparing digital engagement.
      Page 8: Tone of Voice - A flowchart explaining the brand's voice (e.g., professional, energetic).
      Page 9: Sustainability Commitment - Key eco-friendly initiatives with a progress graph.
      Page 10: Contact Information - Website, social media, QR code for brand assets.
      Remember, it is just an example,you do not need to generate all description till page 10, you must wrap it up within the user specified page count.
      Also the output format should always be page<no>:"page description string", never try to nest further objects out of it.
      Output should be formatted as valid JSON with precise descriptions to generate visually compelling brand guideline infographics. 
      Keep the tone modern, clean, and professional.
    `;

  return prompt;
}

export function generateOnePagerPrompt({
  brandName,
  brandInfo,
  brandColors,
  targetAudience,
  bussinessMode,
  achievements,
  website_url
}: Omit<BrandInfographicsArgs, "year" | "pages" | "type">): string {
  const prompt = `Provide me an High detailed and high content single lined prompt to generate image of One-Pager For the following content :
  brandName:${brandName},brandInfo:${brandInfo},brandColors:${brandColors},targetAudience:${targetAudience},bussiness mode:${bussinessMode},key achievements:${achievements}.
  ${
    website_url &&
    `Also it should be like the provided reference website:${website_url}`
  }
  `;

  return prompt;
}

export function generateLogoPrompt({
  brandName,
  brandIdentity,
  brandColors
}: BrandLogoArgs): string {
  const prompt = `
  Create a modern and visually appealing logo for a brand named "${brandName}". 
  The logo should align with the brand identity described as "${brandIdentity}". 
  Incorporate the following brand colors: ${brandColors}. 
  The design should be professional, unique, and versatile for use across various media.`;

  return prompt.trim();
}
