/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AffiliateLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Banggia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Banggiasanpham` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BenefitPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CallLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Congty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dathang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dathangsanpham` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dependant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Donhang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Donhangsanpham` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmergencyContact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeEnrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeSalary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeWorkSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeWorkflow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeWorkflowTask` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExpenseCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FormSubmission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvoiceLineItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeadLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeadTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeaveBalance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeaveRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeaveType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Meeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nhacungcap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayGrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayrollRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payslip` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhieuKho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhieuKhoSanpham` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectPhase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectResource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalaryComponent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sanpham` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SanphamKho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupportTicket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimesheetEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrackingEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkflowTaskTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkflowTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AuditLogToEmployee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Banggiakhachhang` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `contentJson` on table `LandingPage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "AffiliateLink" DROP CONSTRAINT "AffiliateLink_createdById_fkey";

-- DropForeignKey
ALTER TABLE "AffiliateLink" DROP CONSTRAINT "AffiliateLink_landingPageId_fkey";

-- DropForeignKey
ALTER TABLE "Banggiasanpham" DROP CONSTRAINT "Banggiasanpham_banggiaId_fkey";

-- DropForeignKey
ALTER TABLE "Banggiasanpham" DROP CONSTRAINT "Banggiasanpham_sanphamId_fkey";

-- DropForeignKey
ALTER TABLE "CallLog" DROP CONSTRAINT "CallLog_leadId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_supportId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Dathang" DROP CONSTRAINT "Dathang_nhacungcapId_fkey";

-- DropForeignKey
ALTER TABLE "Dathangsanpham" DROP CONSTRAINT "Dathangsanpham_dathangId_fkey";

-- DropForeignKey
ALTER TABLE "Dathangsanpham" DROP CONSTRAINT "Dathangsanpham_idSP_fkey";

-- DropForeignKey
ALTER TABLE "Dependant" DROP CONSTRAINT "Dependant_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Donhang" DROP CONSTRAINT "Donhang_khachhangId_fkey";

-- DropForeignKey
ALTER TABLE "Donhangsanpham" DROP CONSTRAINT "Donhangsanpham_donhangId_fkey";

-- DropForeignKey
ALTER TABLE "Donhangsanpham" DROP CONSTRAINT "Donhangsanpham_idSP_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmergencyContact" DROP CONSTRAINT "EmergencyContact_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_managerId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEnrollment" DROP CONSTRAINT "EmployeeEnrollment_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeEnrollment" DROP CONSTRAINT "EmployeeEnrollment_planId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSalary" DROP CONSTRAINT "EmployeeSalary_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSalary" DROP CONSTRAINT "EmployeeSalary_payGradeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSkill" DROP CONSTRAINT "EmployeeSkill_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSkill" DROP CONSTRAINT "EmployeeSkill_skillId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkSchedule" DROP CONSTRAINT "EmployeeWorkSchedule_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkSchedule" DROP CONSTRAINT "EmployeeWorkSchedule_workScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkflow" DROP CONSTRAINT "EmployeeWorkflow_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkflow" DROP CONSTRAINT "EmployeeWorkflow_templateId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkflowTask" DROP CONSTRAINT "EmployeeWorkflowTask_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkflowTask" DROP CONSTRAINT "EmployeeWorkflowTask_taskTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkflowTask" DROP CONSTRAINT "EmployeeWorkflowTask_workflowId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_approverId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_projectId_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmission" DROP CONSTRAINT "FormSubmission_affiliateLinkId_fkey";

-- DropForeignKey
ALTER TABLE "FormSubmission" DROP CONSTRAINT "FormSubmission_landingPageId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_projectId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceLineItem" DROP CONSTRAINT "InvoiceLineItem_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "JobHistory" DROP CONSTRAINT "JobHistory_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "JobHistory" DROP CONSTRAINT "JobHistory_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "JobHistory" DROP CONSTRAINT "JobHistory_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Kho" DROP CONSTRAINT "Kho_congtyId_fkey";

-- DropForeignKey
ALTER TABLE "LeadLog" DROP CONSTRAINT "LeadLog_leadId_fkey";

-- DropForeignKey
ALTER TABLE "LeadTag" DROP CONSTRAINT "LeadTag_leadId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveBalance" DROP CONSTRAINT "LeaveBalance_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveBalance" DROP CONSTRAINT "LeaveBalance_leaveTypeId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveRequest" DROP CONSTRAINT "LeaveRequest_approverId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveRequest" DROP CONSTRAINT "LeaveRequest_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "LeaveRequest" DROP CONSTRAINT "LeaveRequest_leaveTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payslip" DROP CONSTRAINT "Payslip_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Payslip" DROP CONSTRAINT "Payslip_payrollRunId_fkey";

-- DropForeignKey
ALTER TABLE "PhieuKho" DROP CONSTRAINT "PhieuKho_khoId_fkey";

-- DropForeignKey
ALTER TABLE "PhieuKhoSanpham" DROP CONSTRAINT "PhieuKhoSanpham_phieuKhoId_fkey";

-- DropForeignKey
ALTER TABLE "PhieuKhoSanpham" DROP CONSTRAINT "PhieuKhoSanpham_sanphamId_fkey";

-- DropForeignKey
ALTER TABLE "Position" DROP CONSTRAINT "Position_jobGradeId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_projectManagerId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectPhase" DROP CONSTRAINT "ProjectPhase_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectResource" DROP CONSTRAINT "ProjectResource_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectResource" DROP CONSTRAINT "ProjectResource_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectResource" DROP CONSTRAINT "ProjectResource_resourceRoleId_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_affiliateLinkId_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_registeredUserId_fkey";

-- DropForeignKey
ALTER TABLE "SanphamKho" DROP CONSTRAINT "SanphamKho_khoId_fkey";

-- DropForeignKey
ALTER TABLE "SanphamKho" DROP CONSTRAINT "SanphamKho_sanphamId_fkey";

-- DropForeignKey
ALTER TABLE "SupportTicket" DROP CONSTRAINT "SupportTicket_handlerId_fkey";

-- DropForeignKey
ALTER TABLE "SupportTicket" DROP CONSTRAINT "SupportTicket_relatedUserId_fkey";

-- DropForeignKey
ALTER TABLE "SupportTicket" DROP CONSTRAINT "SupportTicket_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectPhaseId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_relatedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_projectResourceId_fkey";

-- DropForeignKey
ALTER TABLE "TaskAssignment" DROP CONSTRAINT "TaskAssignment_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TimesheetEntry" DROP CONSTRAINT "TimesheetEntry_approverId_fkey";

-- DropForeignKey
ALTER TABLE "TimesheetEntry" DROP CONSTRAINT "TimesheetEntry_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "TimesheetEntry" DROP CONSTRAINT "TimesheetEntry_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TimesheetEntry" DROP CONSTRAINT "TimesheetEntry_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TrackingEvent" DROP CONSTRAINT "TrackingEvent_affiliateLinkId_fkey";

-- DropForeignKey
ALTER TABLE "TrackingEvent" DROP CONSTRAINT "TrackingEvent_triggeredByUserId_fkey";

-- DropForeignKey
ALTER TABLE "WorkflowTaskTemplate" DROP CONSTRAINT "WorkflowTaskTemplate_templateId_fkey";

-- DropForeignKey
ALTER TABLE "_AuditLogToEmployee" DROP CONSTRAINT "_AuditLogToEmployee_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuditLogToEmployee" DROP CONSTRAINT "_AuditLogToEmployee_B_fkey";

-- DropForeignKey
ALTER TABLE "_Banggiakhachhang" DROP CONSTRAINT "_Banggiakhachhang_A_fkey";

-- DropForeignKey
ALTER TABLE "_Banggiakhachhang" DROP CONSTRAINT "_Banggiakhachhang_B_fkey";

-- AlterTable
ALTER TABLE "LandingPage" ALTER COLUMN "contentJson" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "AffiliateLink";

-- DropTable
DROP TABLE "Banggia";

-- DropTable
DROP TABLE "Banggiasanpham";

-- DropTable
DROP TABLE "BenefitPlan";

-- DropTable
DROP TABLE "CallLog";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Congty";

-- DropTable
DROP TABLE "Contract";

-- DropTable
DROP TABLE "Dathang";

-- DropTable
DROP TABLE "Dathangsanpham";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Dependant";

-- DropTable
DROP TABLE "Donhang";

-- DropTable
DROP TABLE "Donhangsanpham";

-- DropTable
DROP TABLE "Education";

-- DropTable
DROP TABLE "EmergencyContact";

-- DropTable
DROP TABLE "Employee";

-- DropTable
DROP TABLE "EmployeeEnrollment";

-- DropTable
DROP TABLE "EmployeeSalary";

-- DropTable
DROP TABLE "EmployeeSkill";

-- DropTable
DROP TABLE "EmployeeWorkSchedule";

-- DropTable
DROP TABLE "EmployeeWorkflow";

-- DropTable
DROP TABLE "EmployeeWorkflowTask";

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "ExpenseCategory";

-- DropTable
DROP TABLE "FormSubmission";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "InvoiceLineItem";

-- DropTable
DROP TABLE "JobGrade";

-- DropTable
DROP TABLE "JobHistory";

-- DropTable
DROP TABLE "Kho";

-- DropTable
DROP TABLE "Lead";

-- DropTable
DROP TABLE "LeadLog";

-- DropTable
DROP TABLE "LeadTag";

-- DropTable
DROP TABLE "LeaveBalance";

-- DropTable
DROP TABLE "LeaveRequest";

-- DropTable
DROP TABLE "LeaveType";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Meeting";

-- DropTable
DROP TABLE "Nhacungcap";

-- DropTable
DROP TABLE "PayGrade";

-- DropTable
DROP TABLE "PayrollRun";

-- DropTable
DROP TABLE "Payslip";

-- DropTable
DROP TABLE "PhieuKho";

-- DropTable
DROP TABLE "PhieuKhoSanpham";

-- DropTable
DROP TABLE "Position";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "ProjectPhase";

-- DropTable
DROP TABLE "ProjectResource";

-- DropTable
DROP TABLE "Registration";

-- DropTable
DROP TABLE "ResourceRole";

-- DropTable
DROP TABLE "SalaryComponent";

-- DropTable
DROP TABLE "Sanpham";

-- DropTable
DROP TABLE "SanphamKho";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "SupportTicket";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "TaskAssignment";

-- DropTable
DROP TABLE "TimesheetEntry";

-- DropTable
DROP TABLE "TrackingEvent";

-- DropTable
DROP TABLE "WorkSchedule";

-- DropTable
DROP TABLE "WorkflowTaskTemplate";

-- DropTable
DROP TABLE "WorkflowTemplate";

-- DropTable
DROP TABLE "_AuditLogToEmployee";

-- DropTable
DROP TABLE "_Banggiakhachhang";

-- DropEnum
DROP TYPE "ApprovalStatus";

-- DropEnum
DROP TYPE "BillingType";

-- DropEnum
DROP TYPE "ComponentType";

-- DropEnum
DROP TYPE "ContractType";

-- DropEnum
DROP TYPE "EmployeeStatus";

-- DropEnum
DROP TYPE "EmploymentType";

-- DropEnum
DROP TYPE "InvoiceStatus";

-- DropEnum
DROP TYPE "LeaveRequestStatus";

-- DropEnum
DROP TYPE "MaritalStatus";

-- DropEnum
DROP TYPE "PayrollStatus";

-- DropEnum
DROP TYPE "PlanType";

-- DropEnum
DROP TYPE "ProjectStatus";

-- DropEnum
DROP TYPE "Relation";

-- DropEnum
DROP TYPE "StatusDonhang";

-- DropEnum
DROP TYPE "TaskStatus";

-- DropEnum
DROP TYPE "TimesheetStatus";

-- DropEnum
DROP TYPE "WorkflowStatus";

-- DropEnum
DROP TYPE "WorkflowType";
