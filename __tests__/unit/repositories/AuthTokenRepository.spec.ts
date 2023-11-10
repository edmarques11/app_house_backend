import { it, expect, describe, beforeAll } from "bun:test";
import AuthTokenRepository from "~/external/clientDatabase/repository/AuthTokenRepository";

describe("Tests Auth Repository", () => {
  let authTokenRepository: AuthTokenRepository;
  const privateKey: string = "bun_test_tcha_tcha_tcha";

  beforeAll(() => {
    authTokenRepository = new AuthTokenRepository(privateKey);
  });

  it("should be possible to create a instance AuthTokenRepository", () => {
    expect(authTokenRepository instanceof AuthTokenRepository).toBeTruthy();
  });

  it("method create token must be to create a valid token", () => {
    const token: string = authTokenRepository.createToken({
      bla: "tcha tcha tcha",
    });
    expect(token).toBeTruthy();

    expect(authTokenRepository.verifyValidToken(token)).toBeTruthy();
  });

  it("method verifyValidToken must be to throw new exception for invalid token", () => {
    const invalidToken = "tcha tcha tcha";

    expect(() => {
      authTokenRepository.verifyValidToken(invalidToken);
    }).toThrow('Token inválido');
  });
});
