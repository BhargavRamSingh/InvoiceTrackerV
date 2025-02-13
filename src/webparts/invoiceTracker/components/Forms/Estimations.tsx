import * as React from "react";
import { useState,useEffect } from "react";
import { Dropdown, IDropdownOption, TextField, DatePicker, PrimaryButton, Label, Checkbox, ChoiceGroup } from "@fluentui/react";
import {  sp } from "@pnp/sp/presets/all";


interface FormData {
  projectType: "New Project" | "Existing Project";
  location: string;
  clientName: string;
  projectTitle: string;
  existingProjectTitle: string;
  estimatedHours: string;
  estimationFor: string;
  submittedDate: Date | undefined;
  estimationTitle: string;
  remarks: string;
  attachment: File | null;
  isEstimationTagged: boolean;
}

const dropdownOptions: IDropdownOption[] = [
  // { key: "GDC", text: "GDC" },
  // { key: "Onsite", text: "Onsite" },
  // { key: "AUS", text: "AUS" },
  // { key: "None", text: "None" },
];

const estimationForOptions: IDropdownOption[] = [
  { key: "Project", text: "Project" },
  { key: "CR", text: "CR" },
  { key: "Consultant", text: "Consultant" },
  { key: "Support", text: "Support" },
];

const projectDropdownOptions: IDropdownOption[] = [
  { key: "Project1", text: "Project 1" },
  { key: "Project2", text: "Project 2" },
  { key: "Project3", text: "Project 3" },
];

const Estimation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    projectType: "New Project",
    location: "",
    clientName: "",
    projectTitle: "",
    existingProjectTitle: "",
    estimatedHours: "",
    estimationFor: "",
    submittedDate: undefined,
    estimationTitle: "",
    remarks: "",
    attachment: null,
    isEstimationTagged: false,
  });
  const [submittedData, setSubmittedData] = useState<FormData[]>([]);
  const [locations, setLocations] = useState<IDropdownOption[]>([]);
  
  useEffect(() => {
    const fetchLocations=async()=>{
        try {
          const locationsData = await sp.web.lists.getByTitle("Location").items.select("Title").get();
          const locationsOptions = locationsData.map((Item: { Title: string }) => ({ key: Item.Title, text: Item.Title }));
          setLocations(locationsOptions);
        } catch (error) {
          console.error("Error fetching locations: ", error);
        }
      };
      fetchLocations();
    }, []);

  const handleChange = (key: keyof FormData, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData({ ...formData, attachment: file });
  };

  const handleSubmit = async () => {
    try {
      // Create new list item
      const item = await sp.web.lists.getByTitle("EstimationList").items.add({
        Location: formData.location,
        ClientName: formData.clientName,
        ProjectTitle: formData.projectType === "New Project" ? formData.projectTitle : formData.existingProjectTitle,
        EstimatedHours: formData.estimatedHours,
        EstimationFor: formData.estimationFor,
        SubmissionDate: formData.submittedDate,
        EstimationTitle: formData.estimationTitle,
        Remarks: formData.remarks,
      });

      // Add file attachment if available
      if (formData.attachment) {
        await sp.web.lists.getByTitle("EstimationList").items.getById(item.data.Id).attachmentFiles.add(formData.attachment.name, formData.attachment);
      }

      // Reset form and add to submitted data state
      setSubmittedData([...submittedData, formData]);
      setFormData({
        projectType: "New Project",
        location: "",
        clientName: "",
        projectTitle: "",
        existingProjectTitle: "",
        estimatedHours: "",
        estimationFor: "",
        submittedDate: undefined,
        estimationTitle: "",
        remarks: "",
        attachment: null,
        isEstimationTagged: false,
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="FormContent">
      <div className="title">Estimations</div>
      <div className="after-title"></div>
      <div className="light-box border-box-shadow m-2 p-2">
        <div className="font-weight-bold mb-3">Estimation Details</div>

        <div className="light-box mb-2 pb-1">
          <div className="row pt-2 px-2">
            <div className="col-md-3">
              <Label>Project Type <span className="mandatoryhastrick">*</span></Label>
              <ChoiceGroup
                selectedKey={formData.projectType}
                onChange={(e, option) => handleChange("projectType", option?.key as "New Project" | "Existing Project")}
                options={[
                  { key: "New Project", text: "New Project" },
                  { key: "Existing Project", text: "Existing Project" },
                ]}
              />
            </div>
          </div>

          {/* Project details based on project type */}
          {formData.projectType === "New Project" ? (
            <div className="row pt-2 px-2">
              <div className="col-md-3">
                <Label>Title of the Project <span className="mandatoryhastrick">*</span></Label>
                <TextField
                  placeholder="Text 1"
                  value={formData.projectTitle}
                  onChange={(e, value) => handleChange("projectTitle", value || "")}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="row pt-2 px-2">
              <div className="col-md-3">
                <Label>Existing Project Title <span className="mandatoryhastrick">*</span></Label>
                <Dropdown
                  placeholder="Select"
                  options={projectDropdownOptions}
                  onChange={(e, option) => handleChange("existingProjectTitle", option?.text || "")}
                  required
                />
              </div>
            </div>
          )}

          <div className="row pt-2 px-2">
            <div className="col-md-3">
              <Label>Location <span className="mandatoryhastrick">*</span></Label>
              <Dropdown
                placeholder="Select"
                options={locations}
                onChange={(e, option) => handleChange("location", option?.text || "")}
                required
              />
            </div>
            <div className="col-md-3">
              <Label>Client Name <span className="mandatoryhastrick">*</span></Label>
              <Dropdown
                placeholder="Select"
                options={dropdownOptions}
                onChange={(e, option) => handleChange("clientName", option?.text || "")}
                required
              />
            </div>
            <div className="col-md-3">
              <Label>Estimated Hours <span className="mandatoryhastrick">*</span></Label>
              <TextField
                placeholder="Enter hours"
                value={formData.estimatedHours}
                onChange={(e, value) => handleChange("estimatedHours", value || "")}
                required
              />
            </div>
            <div className="col-md-3">
              <Label>Estimations For <span className="mandatoryhastrick">*</span></Label>
              <Dropdown
                placeholder="Select"
                options={estimationForOptions}
                onChange={(e, option) => handleChange("estimationFor", option?.text || "")}
                required
              />
            </div>
          </div>

          <div className="row pt-2 px-2">
            <div className="col-md-3">
              <Label>Title of the Estimation <span className="mandatoryhastrick">*</span></Label>
              <TextField
                placeholder="Text 2"
                value={formData.estimationTitle}
                onChange={(e, value) => handleChange("estimationTitle", value || "")}
                required
              />
            </div>
            <div className="col-md-3">
              <Label>Submitted Date <span className="mandatoryhastrick">*</span></Label>
              <DatePicker
                placeholder="Select a date"
                value={formData.submittedDate}
                onSelectDate={(date) => handleChange("submittedDate", date || undefined)}
                
              />
            </div>
            <div className="col-md-9">
              <Label>Remarks</Label>
              <TextField
                multiline
                rows={3}
                value={formData.remarks}
                onChange={(e, value) => handleChange("remarks", value || "")}
              />
            </div>
          </div>

          <div className="row pt-2 px-2">
            <div className="col-md-3">
              <Label>Attachment</Label>
              <input type="file" onChange={handleFileChange} />
            </div>
            <div className="col-md-3">
              <Checkbox
                label="Is Estimation Tagged"
                checked={formData.isEstimationTagged}
                onChange={(e, checked) => handleChange("isEstimationTagged", checked || false)}
              />
            </div>
          </div>

          <div className="row pt-2 px-2">
            <div className="col-md-3">
              <PrimaryButton text="Submit" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export default Estimation;