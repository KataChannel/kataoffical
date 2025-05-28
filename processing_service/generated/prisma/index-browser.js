
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.ProcessedPostScalarFieldEnum = {
  id: 'id',
  source_id: 'source_id',
  title: 'title',
  content_length: 'content_length',
  user_ref: 'user_ref',
  extracted_at: 'extracted_at',
  processed_at: 'processed_at'
};

exports.Prisma.CustomerScalarFieldEnum = {
  id: 'id',
  source_id: 'source_id',
  name: 'name',
  code: 'code',
  codeOld: 'codeOld',
  docCode: 'docCode',
  email: 'email',
  phone: 'phone',
  phone2: 'phone2',
  birthday: 'birthday',
  gender: 'gender',
  address: 'address',
  commune: 'commune',
  district: 'district',
  city: 'city',
  citizenIdentity: 'citizenIdentity',
  identityGrantDate: 'identityGrantDate',
  identityIssuedBy: 'identityIssuedBy',
  customerSource: 'customerSource',
  customerGroup: 'customerGroup',
  branchId: 'branchId',
  firstPaidDate: 'firstPaidDate',
  firstCheckinDate: 'firstCheckinDate',
  firstTreatmentDate: 'firstTreatmentDate',
  lastTreatmentDate: 'lastTreatmentDate',
  lastCheckinDate: 'lastCheckinDate',
  ccStaffId: 'ccStaffId',
  caringStaffCode: 'caringStaffCode',
  marStaffId: 'marStaffId',
  marStaffCode: 'marStaffCode',
  staffId: 'staffId',
  staffCode: 'staffCode',
  gclid: 'gclid',
  state: 'state',
  createdDate: 'createdDate',
  createdBy: 'createdBy',
  modifiedDate: 'modifiedDate',
  modifiedBy: 'modifiedBy',
  extractedAt: 'extractedAt'
};

exports.Prisma.RevenueScalarFieldEnum = {
  id: 'id',
  source_id: 'source_id',
  code: 'code',
  branchId: 'branchId',
  custCode: 'custCode',
  custName: 'custName',
  custPhone: 'custPhone',
  custAddress: 'custAddress',
  custBirthday: 'custBirthday',
  depositId: 'depositId',
  paidAmount: 'paidAmount',
  discountAmount: 'discountAmount',
  depositAmountUsing: 'depositAmountUsing',
  totalPaid: 'totalPaid',
  debtAmount: 'debtAmount',
  methodName: 'methodName',
  content: 'content',
  serviceId: 'serviceId',
  isProduct: 'isProduct',
  quantity: 'quantity',
  priceRoot: 'priceRoot',
  priceUnit: 'priceUnit',
  price: 'price',
  amount: 'amount',
  timeToTreatment: 'timeToTreatment',
  percentOfService: 'percentOfService',
  treatIndex: 'treatIndex',
  type: 'type',
  typeName: 'typeName',
  consultId1: 'consultId1',
  consultId2: 'consultId2',
  consultId3: 'consultId3',
  consultId4: 'consultId4',
  techId: 'techId',
  tele1: 'tele1',
  tele2: 'tele2',
  createdDate: 'createdDate',
  createdBy: 'createdBy',
  modifiedDate: 'modifiedDate',
  state: 'state',
  extractedAt: 'extractedAt'
};

exports.Prisma.TreatmentScalarFieldEnum = {
  id: 'id',
  source_id: 'source_id',
  name: 'name',
  code: 'code',
  codeOld: 'codeOld',
  docCode: 'docCode',
  email: 'email',
  phone: 'phone',
  phone2: 'phone2',
  birthday: 'birthday',
  gender: 'gender',
  address: 'address',
  commune: 'commune',
  district: 'district',
  city: 'city',
  serviceId: 'serviceId',
  serviceTypeId: 'serviceTypeId',
  serviceCode: 'serviceCode',
  tabId: 'tabId',
  tabCode: 'tabCode',
  comboId: 'comboId',
  comboCode: 'comboCode',
  serviceName: 'serviceName',
  timeIndex: 'timeIndex',
  timeToTreatment: 'timeToTreatment',
  teethChoosing: 'teethChoosing',
  priceUnit: 'priceUnit',
  quantity: 'quantity',
  discount: 'discount',
  priceRoot: 'priceRoot',
  priceDiscounted: 'priceDiscounted',
  doctor: 'doctor',
  doctor2: 'doctor2',
  doctor3: 'doctor3',
  doctor4: 'doctor4',
  assistant: 'assistant',
  assistant2: 'assistant2',
  assistant3: 'assistant3',
  assistant4: 'assistant4',
  technician: 'technician',
  technician2: 'technician2',
  timeTreatIndex: 'timeTreatIndex',
  percent: 'percent',
  percentNew: 'percentNew',
  percentStage: 'percentStage',
  percentNewStage: 'percentNewStage',
  note: 'note',
  content: 'content',
  contentNext: 'contentNext',
  symptoms: 'symptoms',
  treatDateNext: 'treatDateNext',
  branchId: 'branchId',
  createdDate: 'createdDate',
  createdBy: 'createdBy',
  modifiedDate: 'modifiedDate',
  modifiedBy: 'modifiedBy',
  state: 'state',
  extractedAt: 'extractedAt'
};

exports.Prisma.AppointmentScalarFieldEnum = {
  id: 'id',
  source_id: 'source_id',
  custId: 'custId',
  custCode: 'custCode',
  custName: 'custName',
  dateFrom: 'dateFrom',
  statusId: 'statusId',
  statusName: 'statusName',
  statusTime: 'statusTime',
  isCancel: 'isCancel',
  branchId: 'branchId',
  branchName: 'branchName',
  content: 'content',
  note: 'note',
  noteForBranch: 'noteForBranch',
  consultId: 'consultId',
  doctorId: 'doctorId',
  doctorId2: 'doctorId2',
  assistantId: 'assistantId',
  roomId: 'roomId',
  room: 'room',
  remindContent: 'remindContent',
  reasonCancelId: 'reasonCancelId',
  typeId: 'typeId',
  typeDetailId: 'typeDetailId',
  serviceCareId: 'serviceCareId',
  serviceCare: 'serviceCare',
  state: 'state',
  createdDate: 'createdDate',
  createdBy: 'createdBy',
  modifiedDate: 'modifiedDate',
  modifiedBy: 'modifiedBy',
  extractedAt: 'extractedAt'
};

exports.Prisma.DichvuScalarFieldEnum = {
  id: 'id',
  source_id: 'source_id',
  name: 'name',
  code: 'code',
  codeOld: 'codeOld',
  docCode: 'docCode',
  email: 'email',
  phone: 'phone',
  phone2: 'phone2',
  birthday: 'birthday',
  gender: 'gender',
  address: 'address',
  commune: 'commune',
  district: 'district',
  city: 'city',
  serviceId: 'serviceId',
  serviceTypeId: 'serviceTypeId',
  serviceCode: 'serviceCode',
  tabId: 'tabId',
  tabCode: 'tabCode',
  comboId: 'comboId',
  comboCode: 'comboCode',
  serviceName: 'serviceName',
  timeIndex: 'timeIndex',
  timeToTreatment: 'timeToTreatment',
  teethChoosing: 'teethChoosing',
  priceUnit: 'priceUnit',
  quantity: 'quantity',
  discount: 'discount',
  priceRoot: 'priceRoot',
  priceDiscounted: 'priceDiscounted',
  doctor: 'doctor',
  doctor2: 'doctor2',
  doctor3: 'doctor3',
  doctor4: 'doctor4',
  assistant: 'assistant',
  assistant2: 'assistant2',
  assistant3: 'assistant3',
  assistant4: 'assistant4',
  technician: 'technician',
  technician2: 'technician2',
  timeTreatIndex: 'timeTreatIndex',
  percent: 'percent',
  percentNew: 'percentNew',
  percentStage: 'percentStage',
  percentNewStage: 'percentNewStage',
  note: 'note',
  content: 'content',
  contentNext: 'contentNext',
  symptoms: 'symptoms',
  treatDateNext: 'treatDateNext',
  branchId: 'branchId',
  createdDate: 'createdDate',
  createdBy: 'createdBy',
  modifiedDate: 'modifiedDate',
  modifiedBy: 'modifiedBy',
  state: 'state',
  extractedAt: 'extractedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  ProcessedPost: 'ProcessedPost',
  Customer: 'Customer',
  Revenue: 'Revenue',
  Treatment: 'Treatment',
  Appointment: 'Appointment',
  Dichvu: 'Dichvu'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
