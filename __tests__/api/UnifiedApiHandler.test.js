jest.mock("../../constants/config", () => ({
  CONFIG: {
    API_BASE_URL: "http://localhost",
    API_STT_LATEST_VERSION: "v1",
    API_MODEL_LATEST_VERSION: "v1",
  },
}));

import MockAdapter from "axios-mock-adapter";
import UnifiedApiHandler from "../../api/UnifiedApiHandler";
import { CONFIG } from "../../constants/config";

describe("UnifiedApiHandler", () => {
  let apiHandler;
  let mock;

  beforeEach(() => {
    apiHandler = new UnifiedApiHandler();
    mock = new MockAdapter(apiHandler.getHttpClient());
  });

  afterEach(() => mock.reset());

  it("should create a transcription", async () => {
    const fakeAudio = "fake audio";
    const fakeTranscription = "fake transcription";
    const fakeTranscriptionSuccessResponnse = {
      data: {
        transcription: "fake transcription",
      },
    };

    mock
      .onPost(`/${CONFIG.API_STT_LATEST_VERSION}/transcriptions`)
      .reply(200, fakeTranscriptionSuccessResponnse);

    const result = await apiHandler.createTranscriptions(fakeAudio);
    expect(result).toBe(fakeTranscription);
  });

  it("should throw an error when audio is missing", async () => {
    await expect(apiHandler.createTranscriptions()).rejects.toThrow(
      "Audio is required."
    );
  });

  it("should create a prediction", async () => {
    const fakeDescription = "fake description";
    const fakePrediction = "fake prediction";
    const fakePredictionSuccessResponse = {
      data: {
        predictions: fakePrediction,
      },
    };

    mock
      .onPost(`/${CONFIG.API_STT_LATEST_VERSION}/predictions`)
      .reply(200, fakePredictionSuccessResponse);

    const result = await apiHandler.createPredictions(fakeDescription);
    expect(result).toBe(fakePrediction);
  });

  it("should throw an error when description is missing", async () => {
    await expect(apiHandler.createPredictions()).rejects.toThrow(
      "Description is required."
    );
  });

  it("should create a feedback", async () => {
    const fakeFeedback = "fake feedback";
    const fakeObjectId = "test_id";
    const fakeFeedbackSuccessResponse = {
      data: { _id: fakeObjectId },
    };

    mock
      .onPost(`/${CONFIG.API_STT_LATEST_VERSION}/predictions/feedback`)
      .reply(200, fakeFeedbackSuccessResponse);

    const result = await apiHandler.createFeedback(fakeFeedback);
    expect(result.data.data._id).toBe(fakeObjectId);
  });

  it("should throw an error when feedback is missing", async () => {
    await expect(apiHandler.createFeedback()).rejects.toThrow(
      "Feedback is required."
    );
  });
});
