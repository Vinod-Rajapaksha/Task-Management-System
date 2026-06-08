import {
  hashPassword,
  comparePassword,
} from "../../../utils/password.js";

describe("Password Utils", () => {
  test("hash password", async () => {
    const hash =
      await hashPassword("123456");

    expect(hash).not.toBe(
      "123456"
    );
  });

  test(
    "compare password",
    async () => {
      const hash =
        await hashPassword(
          "123456"
        );

      const match =
        await comparePassword(
          "123456",
          hash
        );

      expect(match).toBe(
        true
      );
    }
  );
});