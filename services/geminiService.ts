import { GoogleGenAI, Type } from "@google/genai";
import type { DateNightIdea, Product } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const dateNightSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A short, catchy title for the date night idea.",
    },
    description: {
      type: Type.STRING,
      description: "A detailed, romantic, and engaging description of the date night plan.",
    },
    suggested_products: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "A list of 2-3 product names from the provided list that would perfectly enhance this date night.",
    },
  },
  required: ["title", "description", "suggested_products"],
};


export const generateDateNightIdea = async (mood: string, availableProducts: Product[]): Promise<DateNightIdea | null> => {
  try {
    const productNames = availableProducts.map(p => p.name).join(', ');

    const prompt = `You are an expert romance and date night planner.
    Generate a creative, romantic, and slightly adventurous date night idea based on the following mood: "${mood}".

    From the following list of available products, you MUST select 2 or 3 that would best enhance this specific date night. Only return product names that are explicitly in this list.

    Available Products:
    ${productNames}

    Return your response in the specified JSON format.`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: dateNightSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    return parsedJson as DateNightIdea;

  } catch (error) {
    console.error("Error generating date night idea:", error);
    return null;
  }
};
