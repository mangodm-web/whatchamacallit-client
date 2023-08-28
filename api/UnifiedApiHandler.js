import axios from "axios";

import { CONFIG } from "../constants/config";

export default class UnifiedApiHandler {
  constructor(baseURL = `${CONFIG.API_BASE_URL}/api`) {
    this.httpClient = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async createTranscriptions(audio) {
    try {
      if (!audio) {
        throw new Error("Audio is required.");
      }

      const response = await this.httpClient.post(
        `/${CONFIG.API_STT_LATEST_VERSION}/transcriptions`,
        {
          audio,
        }
      );

      return response.data.data.transcription;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createPredictions(description) {
    try {
      if (!description) {
        throw new Error("Description is required.");
      }

      const response = await this.httpClient.post(
        `/${CONFIG.API_MODEL_LATEST_VERSION}/predictions`,
        {
          description,
        }
      );

      return response.data.data.predictions;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
