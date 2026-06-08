import {
  generateAccessToken,
  verifyAccessToken,
} from "../../../utils/jwt.js";

describe(
  "JWT Utils",
  () => {
    test(
      "generate and verify",
      () => {
        const token =
          generateAccessToken(
            "123"
          );

        const decoded =
          verifyAccessToken(
            token
          );

        expect(
          decoded.userId
        ).toBe("123");
      }
    );
  }
);