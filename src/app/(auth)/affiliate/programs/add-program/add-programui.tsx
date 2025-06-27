import React from "react";
import Button from "@/components/Base/Button";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import Link from "next/link";
import GoBackLink from "@/components/GoBack";

export default function AddAffiliateProgram() {
  return (
    <Container className="min-h-screen relative mt-10">
      <div className="absolute top-3 right-4">
      <Link href="/affiliate/programs">
          <Heading level={5} className="whitespace-normal text-sm">
            ← Back to Affiliate Overview
          </Heading>
        </Link>
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-md text-center max-w-3xl w-full">
          <div className="space-y-8 py-12 md:py-20">
            <Heading
              level={2}
              className="whitespace-pre-wrap text-lg md:text-2xl font-semibold text-textsecondary"
            >
              Vendor affiliate program
            </Heading>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/affiliate/programs/add-program/specific-product">
                <Button
                  title="Specific product"
                  className="w-full md:w-auto px-6 py-3"
                />
              </Link>
              <Link href="/affiliate/programs/add-program/all-product">
                <Button
                  title="All product"
                  isPrimary
                  className="w-full md:w-auto px-6 py-3"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
