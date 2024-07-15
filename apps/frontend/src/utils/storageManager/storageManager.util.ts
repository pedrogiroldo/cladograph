import { DescendantObjectsArray } from "@/models/descendantsTypes";
import { ExternalGroup } from "@/models/externalGroupTypes";
import { TraitObjectsArray } from "@/models/traitsTypes";
import { Cookie, SessionStorage } from "storage-manager-js";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export default class StorageManager {
  static Tokens = class {
    private static tokensKey = "tokens";

    static set(tokens: Tokens) {
      return Cookie.set(this.tokensKey, tokens, { useSecure: false });
    }

    static getAccess() {
      const tokens: Tokens | null | string = Cookie.get(this.tokensKey);

      if (tokens !== null && typeof tokens !== "string") {
        const tokensObject: Tokens = tokens;
        return tokensObject.accessToken;
      }
      return undefined;
    }

    static getRefresh() {
      const tokens: string | null = Cookie.get(this.tokensKey);

      if (tokens !== null) {
        const tokensObject: Tokens = JSON.parse(tokens);
        return tokensObject.refreshToken;
      }
    }

    static delete() {
      return Cookie.delete(this.tokensKey);
    }

    static isSaved() {
      return Cookie.has(this.tokensKey);
    }
  };

  static PhylogeneticTreeData = class {
    static ExternalGroup = class {
      private static externalGroupKey = "externalGroup";

      static set(externalGroup: ExternalGroup) {
        return SessionStorage.set(this.externalGroupKey, externalGroup);
      }

      static get() {
        return SessionStorage.get(this.externalGroupKey);
      }
    };

    static Descendants = class {
      private static descendantsKey = "descendants";

      static set(descendants: DescendantObjectsArray) {
        return SessionStorage.set(this.descendantsKey, descendants);
      }

      static get() {
        return SessionStorage.get(this.descendantsKey);
      }
    };

    static Traits = class {
      private static traitsKey = "traits";

      static set(traits: TraitObjectsArray) {
        return SessionStorage.set(this.traitsKey, traits);
      }

      static get() {
        return SessionStorage.get(this.traitsKey);
      }
    };
  };
}
