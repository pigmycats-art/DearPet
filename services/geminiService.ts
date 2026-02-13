
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHealthInsights = async (petType: string, symptoms: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `My pet is a ${petType}. Current symptoms: ${symptoms}. Provide professional advice, care tips, and whether a hospital visit is urgent. Keep it friendly and concise.`,
      config: {
        systemInstruction: "You are a professional veterinarian assistant. Provide helpful, empathetic, and scientifically grounded advice. Always recommend consulting a local vet for serious conditions.",
      }
    });
    return response.text || "Insight unavailable at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI assistant.";
  }
};

export const searchFacilities = async (lat: number, lng: number, type: string): Promise<any[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find high-rated ${type} for pets near latitude ${lat}, longitude ${lng}.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      },
    });
    
    return response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  } catch (error) {
    console.error("Maps Grounding Error:", error);
    return [];
  }
};
