import { describe, expect, jest, test } from "@jest/globals";
import Server from "../src/presentation/server";
import { envs } from "../src/config";

jest.mock("../src/presentation/server");

describe("Test in the App file", () => {
    test("should call server with arguments and start", async () => {
        await import("../src/app");
        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            routes: expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalled();
    });
});
