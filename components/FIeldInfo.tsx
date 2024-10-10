import type { FieldApi } from "@tanstack/react-form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export default function FieldInfo({
  field,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
}) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {field.state.meta.errors.join(", ")}
          </AlertDescription>
        </Alert>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
