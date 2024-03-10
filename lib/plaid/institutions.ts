import { CountryCode } from "plaid";

import { createPlaidClient } from "./plaid-client";

export const getPlaidInstitutionDetails = async (institutionId: string, countryCodes: CountryCode[]) => {
  try {
    const response = await createPlaidClient().institutionsGetById({
      institution_id: institutionId,
      country_codes: countryCodes,
      options: {
        include_optional_metadata: true,
      },
    });

    return response.data.institution;
  } catch (err) {
    return null;
  }
};
