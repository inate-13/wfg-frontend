import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import type { CallDurationPoint } from "../../types/analytics";
 
interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData: CallDurationPoint[];
  onSave: (data: CallDurationPoint[]) => void;
}

export default function EditCallDataModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: Props) {
  const [email, setEmail] = useState("");
  const [values, setValues] = useState<CallDurationPoint[]>([]);
  const [emailError, setEmailError] = useState("");
  const [hasExistingData, setHasExistingData] = useState(false);
  const [overwriteConfirmed, setOverwriteConfirmed] = useState(false);
  const [checkingExisting, setCheckingExisting] = useState(false);

  /**
   * Reset modal state every time it opens
   */
  useEffect(() => {
    if (isOpen) {
      // Clone initial dummy data (VERY IMPORTANT)
      setValues(JSON.parse(JSON.stringify(initialData)));
      setEmail("");
      setEmailError("");
      setHasExistingData(false);
      setOverwriteConfirmed(false);
      setCheckingExisting(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  /**
   * Check if data already exists for this email
   */
  const checkExistingData = async () => {
    if (!email) return;

    setCheckingExisting(true);

    const { data, error } = await supabase
      .from("user_call_data")
      .select("call_data")
      .eq("email", email)
      .single();

    setCheckingExisting(false);

    if (error || !data?.call_data?.length) {
      setHasExistingData(false);
      return;
    }

    setHasExistingData(true);
  };

  /**
   * Save handler with overwrite protection
   */
const handleSave = async () => {
  if (!email) {
    setEmailError("Email is required");
    return;
  }

  // Case 1: Existing data found, but overwrite not confirmed yet
  if (hasExistingData && !overwriteConfirmed) {
    setOverwriteConfirmed(true);
    return;
  }

  // Case 2: First-time save
  if (!hasExistingData) {
    await supabase.from("user_call_data").insert({
      email,
      call_data: values,
    });
  }

  // Case 3: Overwrite confirmed
  if (hasExistingData && overwriteConfirmed) {
    await supabase
      .from("user_call_data")
      .update({ call_data: values })
      .eq("email", email);
  }

  onSave(values);
  onClose();
};


  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-5">
        <h2 className="text-lg font-semibold">Edit Call Duration</h2>

        {/* Email input */}
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
            onBlur={checkExistingData}
          />
          {emailError && (
            <p className="text-sm text-red-500 mt-1">{emailError}</p>
          )}
        </div>

        {/* Overwrite warning */}
        {hasExistingData && !overwriteConfirmed && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm">
            You have previously saved values for this email.
            <br />
            Click <strong>Save</strong> again to overwrite them.
          </div>
        )}

        {/* Editable values */}
        <div className="space-y-2">
          {values.map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                className="border rounded px-2 py-1 w-1/2 bg-gray-50"
                value={item.time}
                readOnly
              />
              <input
                type="number"
                className="border rounded px-2 py-1 w-1/2"
                value={item.duration}
                onChange={(e) => {
                  const updated = [...values];
                  updated[index] = {
                    ...updated[index],
                    duration: Number(e.target.value),
                  };
                  setValues(updated);
                }}
              />
            </div>
          ))}
        </div>

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
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
