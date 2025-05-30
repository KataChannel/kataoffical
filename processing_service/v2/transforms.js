// transforms.js

/**
 * Biến đổi dữ liệu khách hàng thô từ API thành định dạng cho model Prisma Customer.
 * @param {Array} rawData - Dữ liệu thô từ hàm getAllKhachhang.
 * @returns {Array} - Mảng các record khách hàng đã được biến đổi.
 */
function transformCustomerData(rawData) {
    if (!Array.isArray(rawData)) {
        console.warn('Customer Transform: Input data is not an array. Returning empty array.');
        // Hoặc xử lý trường hợp dữ liệu không phải là mảng nếu API có thể trả về object đơn lẻ
         return [];
    }
    const transformedRecords = [];
    rawData.forEach(item => {
        const record = {
            source_id: item.ID.toString(), // Đảm bảo là string nếu ID là số
            name: item.Name,
            code: item.Code,
            codeOld: item.CodeOld || null,
            docCode: item.DocCode || null,
            email: item.Email || null,
            phone: item.Phone || null,
            phone2: item.Phone2 || null,
            birthday: item.Birthday ? new Date(item.Birthday) : null,
            gender: item.Gender || null,
            address: item.Address || null,
            commune: item.Commune || null,
            district: item.District || null,
            city: item.City || null,
            citizenIdentity: item.CitizenIdentity?.CitizenIdentity || null,
            identityGrantDate: item.CitizenIdentity?.GrantDate ? new Date(item.CitizenIdentity.GrantDate) : null,
            identityIssuedBy: item.CitizenIdentity?.IssuedBy || null,
            customerSource: item.CustomerSource || null,
            customerGroup: item.CustomerGroup || null,
            branchId: item.BranchID,
            firstPaidDate: item.DateOf?.FirstPaid ? new Date(item.DateOf.FirstPaid) : null,
            firstCheckinDate: item.DateOf?.FirstCheckin ? new Date(item.DateOf.FirstCheckin) : null,
            firstTreatmentDate: item.DateOf?.FirstTreatment ? new Date(item.DateOf.FirstTreatment) : null,
            lastTreatmentDate: item.DateOf?.LastTreatment ? new Date(item.DateOf.LastTreatment) : null,
            lastCheckinDate: item.DateOf?.LastCheckin ? new Date(item.DateOf.LastCheckin) : null,
            ccStaffId: item.CCStaffID || null,
            caringStaffCode: item.CaringStaffCode || null,
            marStaffId: item.MarStaffID || null,
            marStaffCode: item.MarStaffCode || null,
            staffId: item.StaffID || null,
            staffCode: item.StaffCode || null,
            gclid: item.Gclid || null,
            createdDate: item.CreatedDate ? new Date(item.CreatedDate) : null,
            createdBy: item.CreatedBy || null,
            modifiedDate: item.ModifiedDate ? new Date(item.ModifiedDate) : null,
            modifiedBy: item.ModifiedBy || null,
            state: item.State,
            extractedAt: new Date() // Thêm thời điểm trích xuất
        };
        transformedRecords.push(record);
    });
    return transformedRecords;
}

/**
 * Biến đổi dữ liệu doanh thu thô từ API thành định dạng cho model Prisma Revenue (Giả định).
 * @param {Array} rawData - Dữ liệu thô từ hàm getAllThanhtoan.
 * @returns {Array} - Mảng các record doanh thu đã được biến đổi.
 */
function transformRevenueData(rawData) {
     if (!Array.isArray(rawData)) {
        console.warn('Revenue Transform: Input data is not an array. Returning empty array.');
        return [];
    }
    const transformedRecords = [];
    // !!! Giả định cấu trúc dữ liệu doanh thu dựa trên ví dụ comment trong revenue.js
    // !!! và một cấu trúc bảng Prisma.Revenue tương ứng.
    // !!! Bạn cần điều chỉnh dựa trên model Prisma thực tế của bạn.
    rawData.forEach(item => {
         // Ví dụ: Kiểm tra xem có phải là bản ghi Deposit hợp lệ không
        const record = {
            source_id: item.ID.toString(), // Dùng ID làm source_id (đảm bảo là string)
            code: item.Code,
            branchId: item.BranchID,
            custCode: item.CustCode,
            custName: item.CustName,
            custPhone: item.CustPhone,
            custAddress: item.CustAddress || null,
            custBirthday: item.CustBirthday ? new Date(item.CustBirthday) : null,
            depositId: item.DepositID,
            paidAmount: item.Paid,
            discountAmount: item.DiscountAmount || 0,
            depositAmountUsing: item.DepositAmountUsing || 0,
            totalPaid: item.TotalPaid || 0,
            debtAmount: item.DebtAmount || 0,
            methodName: item.MethodName,
            content: item.Content || null,
            serviceId: item.ServiceID || 0,
            isProduct: item.IsProduct || 0,
            quantity: item.Quantity || 0,
            priceRoot: item.PriceRoot || 0,
            priceUnit: item.PriceUnit || 0,
            price: item.Price || 0,
            amount: item.Amount || 0,
            timeToTreatment: item.TimeToTreatment || 0,
            percentOfService: item.PercentOfService || 0,
            treatIndex: item.TreatIndex || 0,
            type: item.Type.toString(), // Đảm bảo là string
            typeName: item.TypeName,
            consultId1: item.ConsultID1 || 0,
            consultId2: item.ConsultID2 || 0,
            consultId3: item.ConsultID3 || 0,
            consultId4: item.ConsultID4 || 0,
            techId: item.TechID || 0,
            tele1: item.Tele1 || 0,
            tele2: item.Tele2 || 0,
            createdDate: item.Created ? new Date(item.Created) : null,
            createdBy: item.CreatedBy?.toString(),
            modifiedDate: item.ModifiedDate ? new Date(item.ModifiedDate) : null,
            state: item.State,
            extractedAt: new Date()
        };
        
        transformedRecords.push(record);
    });
    return transformedRecords;
}

/**
 * Biến đổi dữ liệu doanh thu thô từ API thành định dạng cho model Prisma Revenue (Giả định).
 * @param {Array} rawData - Dữ liệu thô từ hàm getAllDieutri.
 * @returns {Array} - Mảng các record điều trị đã được biến đổi.
 */
function transformTreatmentData(rawData) {
     if (!Array.isArray(rawData)) {
        console.warn('Treatment Transform: Input data is not an array. Returning empty array.');
        return [];
    }
    const transformedRecords = [];
    rawData.forEach(item => {
        const record = {
            source_id: item.Code?.toString()+item.Service?.ServiceCode.toString()+item.CreatedDate?.toString() || "", // Ensure source_id is a string
            name: item.Name || "",
            code: item.Code || "",
            codeOld: item.CodeOld || null,
            docCode: item.DocCode || null,
            email: item.Email || null,
            phone: item.Phone || null,
            phone2: item.Phone2 || null,
            birthday: item.Birthday ? new Date(item.Birthday) : null,
            gender: item.Gender || null,
            address: item.Address || null,
            commune: item.Commune || null,
            district: item.District || null,
            city: item.City || null,
            
            // Service details
            serviceId: item.Service?.ServiceID || 0,
            serviceTypeId: item.Service?.ServiceTypeID || 0,
            serviceCode: item.Service?.ServiceCode || "",
            tabId: item.Service?.TabID || 0,
            tabCode: item.Service?.TabCode || "",
            comboId: item.Service?.ComboID || 0,
            comboCode: item.Service?.ComboCode || "",
            serviceName: item.Service?.ServiceName || "",
            timeIndex: item.Service?.TimeIndex || "",
            timeToTreatment: item.TimeToTreatment || item.Service?.TimeToTreatment || 0,
            teethChoosing: item.Service?.TeethChoosing || "",
            priceUnit: item.Service?.PriceUnit || 0,
            quantity: item.Service?.Quantity || 0,
            discount: item.Service?.Discount || 0,
            priceRoot: item.Service?.PriceRoot || 0,
            priceDiscounted: item.Service?.PriceDiscounted || 0,
            
            // Participation information
            doctor: item.Participate?.Doctor || 0,
            doctor2: item.Participate?.Doctor2 || 0,
            doctor3: item.Participate?.Doctor3 || 0,
            doctor4: item.Participate?.Doctor4 || 0,
            assistant: item.Participate?.Assistant || 0,
            assistant2: item.Participate?.Assistant2 || 0,
            assistant3: item.Participate?.Assistant3 || 0,
            assistant4: item.Participate?.Assistant4 || 0,
            technician: item.Participate?.Technician || 0,
            technician2: item.Participate?.Technician2 || 0,
            
            // Treatment details
            timeTreatIndex: item.TimeTreatIndex || 0,
            percent: item.Percent || 0,
            percentNew: item.PercentNew || 0,
            percentStage: item.PercentStage || 0,
            percentNewStage: item.PercentNewStage || 0,
            note: item.Note || "",
            content: item.Content || "",
            contentNext: item.ContentNext || "",
            symptoms: item.Symptoms || "",
            treatDateNext: item.TreatDateNext ? new Date(item.TreatDateNext) : null,
            branchId: item.BranchID || 0,
            
            // Metadata
            createdDate: item.CreatedDate ? new Date(item.CreatedDate) : null,
            createdBy: item.CreatedBy?.toString() || null,
            modifiedDate: item.ModifiedDate ? new Date(item.ModifiedDate) : null,
            modifiedBy: item.ModifiedBy || 0,
            state: item.State || 0,
            extractedAt: new Date()
        };
        
        transformedRecords.push(record);
    });
    return transformedRecords;
}


/**
 * Biến đổi dữ liệu doanh thu thô từ API thành định dạng cho model Prisma Revenue (Giả định).
 * @param {Array} rawData - Dữ liệu thô từ hàm getAllLichhen.
 * @returns {Array} - Mảng các record điều trị đã được biến đổi.
 */
function transformAppointmentData(rawData) {
     if (!Array.isArray(rawData)) {
        console.warn('Appointment Transform: Input data is not an array. Returning empty array.');
        return [];
    }
    const transformedRecords = [];
    // !!! Giả định cấu trúc dữ liệu điều trị dựa trên ví dụ comment trong Appointment.js
    // !!! và một cấu trúc bảng Prisma.Appointment tương ứng.
    // !!! Bạn cần điều chỉnh dựa trên model Prisma thực tế của bạn.
    rawData.forEach(item => {
        const record = {
            source_id: item.ID?.toString() || "", 
            custId: item.CustID?.toString() || null,
            custCode: item.CustCode || null,
            custName: item.CustName || null,
            dateFrom: item.DateFrom ? new Date(item.DateFrom) : null,
            statusId: item.StatusID || 0,
            statusName: item.StatusName || null,
            statusTime: item.StatusTime ? new Date(item.StatusTime) : null,
            isCancel: item.IsCancel || 0,
            branchId: item.BranchID || 0,
            branchName: item.BranchName || null,
            content: item.Content || null,
            note: item.Note || null,
            noteForBranch: item.NoteForBranch || null,
            consultId: item.ConsultID || 0,
            doctorId: item.DoctorID || 0, 
            doctorId2: item.DoctorID2 || 0,
            assistantId: item.AssistantID || 0,
            roomId: item.RoomID || 0,
            room: item.Room || null,
            remindContent: item.RemindContent || null,
            reasonCancelId: item.ReasonCancelID || 0,
            typeId: item.TypeID || 0,
            typeDetailId: item.TypeDetailID || 0,
            serviceCareId: item.ServiceCareID || null,
            serviceCare: item.ServiceCare || null,
            state: item.State || 0,
            createdDate: item.CreatedDate ? new Date(item.CreatedDate) : null,
            createdBy: item.CreatedBy?.toString() || null,
            modifiedDate: item.ModifiedDate ? new Date(item.ModifiedDate) : null,
            modifiedBy: item.ModifiedBy?.toString() || null,
            extractedAt: new Date()
        };
        
        transformedRecords.push(record);
    });
    return transformedRecords;
}

/**
 * Biến đổi dữ liệu dịch vụ thô từ API thành định dạng cho model Prisma Dichvu (Giả định).
 * @param {Array} rawData - Dữ liệu thô từ hàm getAllDichvu.
 * @returns {Array} - Mảng các record dịch vụ đã được biến đổi.
 */
function transformDichvuData(rawData) {
    if (!Array.isArray(rawData)) {
        console.warn('Dichvu Transform: Input data is not an array. Returning empty array.');
        return [];
    }
    const transformedRecords = [];
    // !!! LƯU Ý: Cấu trúc này là giả định. Bạn cần điều chỉnh dựa trên
    // !!! phản hồi thực tế của API 'Customer/GetTab' và model Prisma.Dichvu của bạn.
    rawData.forEach(item => {
        // Cần đảm bảo có một ID duy nhất. Nếu API không cung cấp, bạn cần tạo ra.
        // Giả sử API trả về 'ID'.
        const sourceId = item.ID?.toString() || `${item.Code}_${item.Phone}_${item.CreatedDate}`;

        const record = {
            // Basic Fields
            source_id: sourceId,
            name: item.Name || "",
            code: item.Code?.toString() || "",
            codeOld: item.CodeOld || null,
            docCode: item.DocCode || null,
            email: item.Email || null,
            phone: item.Phone || null,
            phone2: item.Phone2 || null,
            birthday: item.Birthday ? new Date(item.Birthday) : null,
            gender: item.Gender || null,
            address: item.Address || null,
            commune: item.Commune || null,
            district: item.District || null,
            city: item.City || null,
            // Service Fields
            serviceId: item.Service?.ServiceID || 0,
            serviceTypeId: item.Service?.ServiceTypeID || 0,
            serviceCode: item.Service?.ServiceCode || "",
            tabId: item.Service?.TabID || 0,
            tabCode: item.Service?.TabCode || "",
            comboId: item.Service?.ComboID || 0,
            comboCode: item.Service?.ComboCode || null,
            serviceName: item.Service?.ServiceName || "",
            timeIndex: item.Service?.TimeIndex || "",
            timeToTreatment: Number(item.Service?.TimeToTreatment) || 0,
            teethChoosing: item.Service?.TeethChoosing || "",
            priceUnit: item.Service?.PriceUnit || 0,
            quantity: item.Service?.Quantity || 0,
            discount: item.Service?.Discount ?? 0,
            priceRoot: item.Service?.PriceRoot || 0,
            priceDiscounted: item.Service?.PriceDiscounted ?? 0,
            // Participation Fields
            doctor: item.Participate?.Doctor || 0,
            doctor2: item.Participate?.Doctor2 || 0,
            doctor3: item.Participate?.Doctor3 || 0,
            doctor4: item.Participate?.Doctor4 || 0,
            assistant: item.Participate?.Assistant || 0,
            assistant2: item.Participate?.Assistant2 || 0,
            assistant3: item.Participate?.Assistant3 || 0,
            assistant4: item.Participate?.Assistant4 || 0,
            technician: item.Participate?.Technician || 0,
            technician2: item.Participate?.Technician2 || 0,
            // Additional Fields
            timeTreatIndex: item.TimeTreatIndex || 0,
            percent: item.Percent || 0,
            percentNew: item.PercentNew || 0,
            percentStage: item.PercentStage || 0,
            percentNewStage: item.PercentNewStage || 0,
            note: item.Note || null,
            content: item.Content || null,
            contentNext: item.ContentNext || null,
            symptoms: item.Symptoms || null,
            treatDateNext: item.TreatDateNext ? new Date(item.TreatDateNext) : null,
            branchId: item.BranchID || 0,
            createdDate: item.CreatedDate ? new Date(item.CreatedDate) : new Date(),
            createdBy: item.CreatedBy ? Number(item.CreatedBy) : 0,
            modifiedDate: item.ModifiedDate ? new Date(item.ModifiedDate) : null,
            modifiedBy: item.ModifiedBy ? Number(item.ModifiedBy) : 0,
            state: item.State || 0,
            extractedAt: new Date()
        };
        transformedRecords.push(record);
    });
    return transformedRecords;
}


module.exports = {
    transformCustomerData,
    transformRevenueData,
    transformAppointmentData,
    transformTreatmentData,
    transformDichvuData
};