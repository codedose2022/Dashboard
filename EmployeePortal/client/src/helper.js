export const validateRequired = (field) => {
  return field === "" ? "This field is required" : "";
};

export const isEventMember = (division) => {
  return division === "EE";
};

export const isSuperAdmin = (division) => {
  return division === "SA";
};

export const employeeFormData = (addEmployee, dependence) => {
  const formData = new FormData();
  formData.append("firstName", addEmployee.firstName);
  formData.append("lastName", addEmployee.lastName);
  formData.append("employeeCode", addEmployee.employeeCode);
  formData.append("department", addEmployee.department);
  formData.append("designation", addEmployee.designation);
  formData.append("division", addEmployee.division);
  formData.append("dateOfHire", addEmployee.dateOfHire);
  formData.append("deskPhone", addEmployee.deskPhone);
  formData.append("workMobile", addEmployee.workMobile);
  formData.append("employeeStatus", addEmployee.employeeStatus);
  formData.append("phoneNumber", addEmployee.phoneNumber);
  formData.append("selectedFile", addEmployee.selectedFile);
  formData.append("nationality", addEmployee.nationality);
  formData.append("gender", addEmployee.gender);
  formData.append("maritalStatus", addEmployee.maritalStatus);
  formData.append("dob", addEmployee.dob);
  formData.append("hobbies", addEmployee.hobbies);
  formData.append("dietPath", addEmployee.dietPath);
  formData.append("email", addEmployee.email);
  formData.append("dependenceDetails", JSON.stringify(dependence));
  return formData;
};
