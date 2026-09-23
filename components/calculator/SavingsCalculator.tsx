"use client";

import { useId, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// The only figure this calculator uses is the one already published across the site
// (see content/technology.ts, content/solutions.ts) — it's mechanically applied to
// the visitor's own numbers, not a new claim.
const SAVINGS_RATE = 0.3;

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function SavingsCalculator() {
  const [sites, setSites] = useState(1);
  const [monthlySpend, setMonthlySpend] = useState(2000);
  const sitesId = useId();
  const spendId = useId();

  const annualSpend = Math.max(0, sites) * Math.max(0, monthlySpend) * 12;
  const estimatedSavings = annualSpend * SAVINGS_RATE;

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      <Card radius="lg" className="p-7 md:p-8">
        <div className="grid gap-6">
          <div>
            <label htmlFor={sitesId} className="text-caption mb-2 block font-medium text-text">
              Number of sites
            </label>
            <input
              id={sitesId}
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={sites}
              onChange={(e) => setSites(Math.max(1, Math.round(Number(e.target.value) || 1)))}
              className="block h-12 w-full rounded-sm-card bg-surface px-4 text-[1.0625rem] text-text ring-1 ring-inset ring-hairline outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <div>
            <label htmlFor={spendId} className="text-caption mb-2 block font-medium text-text">
              Average monthly HVAC energy spend, per site
            </label>
            <div className="relative">
              <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-2">
                $
              </span>
              <input
                id={spendId}
                type="number"
                inputMode="numeric"
                min={0}
                step={100}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Math.max(0, Number(e.target.value) || 0))}
                className="block h-12 w-full rounded-sm-card bg-surface pl-8 pr-4 text-[1.0625rem] text-text ring-1 ring-inset ring-hairline outline-none focus-visible:ring-2 focus-visible:ring-accent"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card radius="lg" className="flex flex-col justify-center p-7 text-center md:p-8">
        <p className="text-caption font-medium text-text-2">Estimated savings potential, up to 30%/year</p>
        <p className="text-stat mt-3 text-accent">{currency.format(estimatedSavings)}</p>
        <p className="text-body mt-3 text-text-2">
          across {sites} {sites === 1 ? "site" : "sites"}, on an estimated {currency.format(annualSpend)}/year in HVAC energy spend
        </p>
        <div className="mt-6">
          <Button href="/contact/#book" size="lg">
            Book a call to confirm your number
          </Button>
        </div>
      </Card>
    </div>
  );
}
