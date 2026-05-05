import { NhomkhachhangService } from './nhomkhachhang.service';
import { Nhomkhachhang } from './entities/nhomkhachhang.entity';
import { CreateNhomkhachhangInput } from './dto/create-nhomkhachhang.dto';
import { UpdateNhomkhachhangInput } from './dto/update-nhomkhachhang.dto';
import { ManageKhachhangInNhomInput } from './dto/manage-khachhang-nhom.dto';
import { NhomkhachhangFilterInput, NhomkhachhangPaginationInput, NhomkhachhangSortInput } from './dto/filter-nhomkhachhang.dto';
import { NhomkhachhangConnection, NhomkhachhangMutationResponse } from './types/nhomkhachhang-response.type';
export declare class NhomkhachhangResolver {
    private readonly nhomkhachhangService;
    constructor(nhomkhachhangService: NhomkhachhangService);
    getNhomkhachhang(filter?: NhomkhachhangFilterInput, pagination?: NhomkhachhangPaginationInput, sort?: NhomkhachhangSortInput): Promise<NhomkhachhangConnection>;
    getNhomkhachhangById(id: string): Promise<Nhomkhachhang>;
    createNhomkhachhang(input: CreateNhomkhachhangInput): Promise<NhomkhachhangMutationResponse>;
    updateNhomkhachhang(id: string, input: UpdateNhomkhachhangInput): Promise<NhomkhachhangMutationResponse>;
    deleteNhomkhachhang(id: string): Promise<NhomkhachhangMutationResponse>;
    addKhachhangToNhom(input: ManageKhachhangInNhomInput): Promise<NhomkhachhangMutationResponse>;
    removeKhachhangFromNhom(input: ManageKhachhangInNhomInput): Promise<NhomkhachhangMutationResponse>;
    getAllNhomkhachhangSimple(): Promise<Nhomkhachhang[]>;
}
