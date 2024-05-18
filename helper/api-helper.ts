import { expect } from "@playwright/test";
import Ajv from "ajv";

export async function validateJsonSchema(fileName: string, body: object) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const existingSchema = require(`../data/schema/${fileName}`);

  const ajv = new Ajv({ allErrors: false });
  const validate = ajv.compile(existingSchema);
  const validRes = validate(body);

  if (!validRes) {
    console.log("SCHEMA ERRORS:", JSON.stringify(validate.errors), "\nRESPONSE BODY:", JSON.stringify(body));
  }

  expect(validRes).toBe(true);
}