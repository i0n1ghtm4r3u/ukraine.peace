import { describe, expect, it } from "vitest";
import { DIRECTIONS, PAYMENT_METHODS, cryptoWallets, parseDirection } from "@/lib/content";

describe("donation rules", () => {
  it("offers two directions: people hurt by the war and people who took part in the fighting", () => {
    expect([...DIRECTIONS]).toEqual(["civilians", "fighters"]);
  });

  it("rejects any other direction from the address bar", () => {
    expect(parseDirection("weapons")).toBeUndefined();
    expect(parseDirection("drones")).toBeUndefined();
    expect(parseDirection("fighters")).toBe("fighters");
  });

  it("accepts euro and crypto", () => {
    expect([...PAYMENT_METHODS]).toEqual(["eur", "crypto"]);
  });

  it("lists USDT (TRC-20), BTC and ETH wallets", () => {
    expect(cryptoWallets.map((w) => `${w.name}:${w.network}`)).toEqual([
      "USDT:TRC-20",
      "Bitcoin:BTC",
      "Ethereum:ERC-20",
    ]);
  });
});
