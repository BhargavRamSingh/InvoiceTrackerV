import * as React from "react";
import { useState } from "react";
import {
  TextField,
  Dropdown,
  DatePicker,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";

const NewProposalForm: React.FC<{ context: WebPartContext }> = ({ context }) => {
  const [formData, setFormData] = useState({
    location: "AUS",
    clientName: "",
    proposalFor: "",
    projectTitle: "",
    proposalTitle: "",
    estimationHours: "",
    amount: "",
    status: "",
    submittedBy: "Pappula Venkatesh",
    submittedDate: null,
    remarks: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    // Add logic to save data to SharePoint list
  };

  return (
    <div style={{ padding: 20, background: "white", borderRadius: 8 }}>
      <h2 style={{ background: "purple", color: "white", padding: 10 }}>New Proposal</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Dropdown
          label="Location *"
          options={[{ key: "AUS", text: "AUS" }]}
          disabled
        />
        <Dropdown
          label="Client Name *"
          options={[{ key: "None", text: "None" }]}
          onChange={(_, option) => handleInputChange("clientName", option?.key)}
        />
        <Dropdown
          label="Proposal For *"
          options={[{ key: "None", text: "None" }]}
          onChange={(_, option) => handleInputChange("proposalFor", option?.key)}
        />
        <Dropdown
          label="Title of the Project *"
          options={[{ key: "None", text: "None" }]}
          onChange={(_, option) => handleInputChange("projectTitle", option?.key)}
        />
        <Dropdown
          label="Title of the Proposal *"
          options={[{ key: "None", text: "None" }]}
          onChange={(_, option) => handleInputChange("proposalTitle", option?.key)}
        />
        <TextField
          label="Estimation Hours *"
          onChange={(e, val) => handleInputChange("estimationHours", val)}
        />
        <TextField
          label="Amount (AUS) *"
          onChange={(e, val) => handleInputChange("amount", val)}
        />
        <Dropdown
          label="Status *"
          options={[{ key: "None", text: "None" }]}
          onChange={(_, option) => handleInputChange("status", option?.key)}
        />
        <TextField label="Submitted By *" disabled value="Pappula Venkatesh" />
        <DatePicker
          label="Submitted Date *"
          onSelectDate={(date) => handleInputChange("submittedDate", date)}
        />
        <TextField
          label="Remarks"
          multiline
          rows={3}
          onChange={(e, val) => handleInputChange("remarks", val)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <input type="file" />
      </div>
      <div style={{ marginTop: 20 }}>
        <PrimaryButton text="Submit" onClick={handleSubmit} />
        <DefaultButton text="Cancel" style={{ marginLeft: 10 }} />
      </div>
    </div>
  );
};

export default NewProposalForm;
