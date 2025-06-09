"use client";
import { Amplify } from "aws-amplify";
import outputs from "@workspace/api/amplify_outputs.json";
import { AttributeSelector } from "@workspace/feature/attribute/components/AttributeSelector";

Amplify.configure(outputs);

export default function Page() {
  return (
    <div className="py-20">
      <h1 className="text-4xl font-bold text-center mb-20">Test Achmad Jamaludin RePrecnict</h1>
      <div className="flex flex-col items-center justify-center">
        <h4>Building Attributes</h4>
        <AttributeSelector
          variant="inverted"
          className="w-[400px]"
        />
      </div>
    </div>
    
  )
}
  