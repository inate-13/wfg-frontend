import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { CallDurationPoint } from "../../types/analytics";
 
interface Props {
  isOpen: boolean;
  onClose: () => void;
  dataToSave: CallDurationPoint[];
  onSaved: (data: CallDurationPoint[]) => void;
}

export default function SaveCallDataModal({
  isOpen,
  onClose,
  dataToSave,
  onSaved,
}: Props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [hasExistingData, setHasExistingData] = useState(false);
  const [overwriteConfirmed, setOverwriteConfirmed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setEmailError("");
      setHasExistingData(false);
      setOverwriteConfirmed(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const checkExisting = async () => {
    if (!email) return;

    const { data } = await supabase
      .from("user_call_data")
      .select("email")
      .eq("email", email)
      .single();

    if (data) {
      setHasExistingData(true);
    }
  };

  const handleSave = async () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    // Ask overwrite once
    if (hasExistingData && !overwriteConfirmed) {
      setOverwriteConfirmed(true);
      return;
    }

    // First-time save
    if (!hasExistingData) {
      await supabase.from("user_call_data").insert({
        email,
        call_data: dataToSave,
      });
    }

    // Overwrite confirmed
    if (hasExistingData && overwriteConfirmed) {
      await supabase
        .from("user_call_data")
        .update({ call_data: dataToSave })
        .eq("email", email);
    }

    onSaved(dataToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5">
        <h2 className="text-lg font-semibold">Save Changes</h2>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            onBlur={checkExisting}
          />
          {emailError && (
            <p className="text-sm text-red-500 mt-1">{emailError}</p>
          )}
        </div>

        {/* Overwrite Warning */}
        {hasExistingData && !overwriteConfirmed && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
            Data already exists for this email.
            <br />
            Click <strong>Save</strong> again to overwrite.
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
