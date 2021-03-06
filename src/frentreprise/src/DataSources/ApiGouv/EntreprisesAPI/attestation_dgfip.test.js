import { nestcribe_path as test } from "../../../../tests/utils";

import utils from "../utils";
import attestation_dgfip from "./attestation_dgfip";

test("DataSources/ApiGouv/EntreprisesAPI/attestation_dgfip", () => {
  it("gets url", async () => {
    const apiData = {
      url: "http://attestation_url"
    };

    const Axios = {
      get: () =>
        Promise.resolve({
          data: apiData
        })
    };

    const result = await attestation_dgfip("SIREN", Axios, {});
    expect(result).toEqual({ attestation_dgfip: apiData.url });
  });

  it("handles invalid data", async () => {
    expect(
      await attestation_dgfip(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {}
            })
        },
        {}
      )
    ).toEqual({});

    expect(
      await attestation_dgfip(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: null
            })
        },
        {}
      )
    ).toEqual({});

    expect(
      await attestation_dgfip(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                url: new Date()
              }
            })
        },
        {}
      )
    ).toEqual({});
  });

  it("returns an empty data when it fails", async () => {
    const Axios = {
      get: () => Promise.reject()
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});

    const result = await attestation_dgfip("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
