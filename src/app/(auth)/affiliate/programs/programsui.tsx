"use client";
import React from "react";
import Button from "@/components/Base/Button";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import Link from "next/link";
import AddAllProductAffiliateProgram from "./all-product/all-productui";

export default function AffiliatePrograms() {
  return (
    <Container className="relative min-h-screen flex flex-col w-full px-0 md:px-0 lg:px-0">
      <div className="w-full">
        <div className="flex flex-col md:flex-row w-full justify-between items-center p-4 md:p-5 mt-6 md:mt-0 gap-3">
          <Heading
            level={1}
            className="text-textsecondary text-center md:text-left"
          >
            Affiliate overview
          </Heading>
          <Link href="/affiliate/programs/add-program">
            <Button
              title="Add affiliate program"
              className="whitespace-nowrap"
            />
          </Link>
        </div>
        <div>
          <AddAllProductAffiliateProgram />
        </div>
      </div>
    </Container>
  );
}
