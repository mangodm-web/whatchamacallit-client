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
    const fakeTranscription = {
      data: {
        transcription: "fake transcription",
      },
    };

    mock
      .onPost(`/${CONFIG.API_STT_LATEST_VERSION}/transcriptions`)
      .reply(200, fakeTranscription);

    const result = await apiHandler.createTranscriptions("fake audio");
    expect(result).toBe("fake transcription");
  });

  it("should throw an error when audio is missing", async () => {
    await expect(apiHandler.createTranscriptions()).rejects.toThrow(
      "Audio is required."
    );
  });
});
