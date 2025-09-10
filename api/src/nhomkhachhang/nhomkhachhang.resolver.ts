import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { NhomkhachhangService } from './nhomkhachhang.service';
import { Nhomkhachhang } from './entities/nhomkhachhang.entity';
import { CreateNhomkhachhangInput } from './dto/create-nhomkhachhang.dto';
import { UpdateNhomkhachhangInput } from './dto/update-nhomkhachhang.dto';
import { ManageKhachhangInNhomInput } from './dto/manage-khachhang-nhom.dto';
import { 
  NhomkhachhangFilterInput, 
  NhomkhachhangPaginationInput, 
  NhomkhachhangSortInput 
} from './dto/filter-nhomkhachhang.dto';
import { 
  NhomkhachhangConnection, 
  NhomkhachhangMutationResponse 
} from './types/nhomkhachhang-response.type';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => Nhomkhachhang)
export class NhomkhachhangResolver {
  constructor(private readonly nhomkhachhangService: NhomkhachhangService) {}

  // =============== QUERIES ===============

  @Query(() => NhomkhachhangConnection, { 
    name: 'getNhomkhachhang',
    description: 'Lấy danh sách nhóm khách hàng với phân trang và lọc' 
  })
  async getNhomkhachhang(
    @Args('filter', { type: () => NhomkhachhangFilterInput, nullable: true }) 
    filter?: NhomkhachhangFilterInput,
    
    @Args('pagination', { type: () => NhomkhachhangPaginationInput, nullable: true }) 
    pagination?: NhomkhachhangPaginationInput,
    
    @Args('sort', { type: () => NhomkhachhangSortInput, nullable: true }) 
    sort?: NhomkhachhangSortInput
  ): Promise<NhomkhachhangConnection> {
    return this.nhomkhachhangService.findAllNhomkhachhang(filter, pagination, sort);
  }

  @Query(() => Nhomkhachhang, { 
    name: 'getNhomkhachhangById',
    description: 'Lấy nhóm khách hàng theo ID' 
  })
  async getNhomkhachhangById(
    @Args('id', { type: () => ID }) id: string
  ): Promise<Nhomkhachhang> {
    return this.nhomkhachhangService.findOneNhomkhachhang(id);
  }

  // =============== MUTATIONS ===============

  @Mutation(() => NhomkhachhangMutationResponse, { 
    name: 'createNhomkhachhang',
    description: 'Tạo nhóm khách hàng mới' 
  })
  async createNhomkhachhang(
    @Args('input', new ValidationPipe({ transform: true })) input: CreateNhomkhachhangInput
  ): Promise<NhomkhachhangMutationResponse> {
    try {
      const data = await this.nhomkhachhangService.createNhomkhachhang(input);
      return {
        success: true,
        message: 'Tạo nhóm khách hàng thành công',
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Mutation(() => NhomkhachhangMutationResponse, { 
    name: 'updateNhomkhachhang',
    description: 'Cập nhật nhóm khách hàng' 
  })
  async updateNhomkhachhang(
    @Args('id', { type: () => ID }) id: string,
    @Args('input', new ValidationPipe({ transform: true })) input: UpdateNhomkhachhangInput
  ): Promise<NhomkhachhangMutationResponse> {
    try {
      const data = await this.nhomkhachhangService.updateNhomkhachhang(id, input);
      return {
        success: true,
        message: 'Cập nhật nhóm khách hàng thành công',
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Mutation(() => NhomkhachhangMutationResponse, { 
    name: 'deleteNhomkhachhang',
    description: 'Xóa nhóm khách hàng' 
  })
  async deleteNhomkhachhang(
    @Args('id', { type: () => ID }) id: string
  ): Promise<NhomkhachhangMutationResponse> {
    try {
      await this.nhomkhachhangService.removeNhomkhachhang(id);
      return {
        success: true,
        message: 'Xóa nhóm khách hàng thành công'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Mutation(() => NhomkhachhangMutationResponse, { 
    name: 'addKhachhangToNhom',
    description: 'Thêm khách hàng vào nhóm' 
  })
  async addKhachhangToNhom(
    @Args('input', new ValidationPipe({ transform: true })) input: ManageKhachhangInNhomInput
  ): Promise<NhomkhachhangMutationResponse> {
    try {
      const data = await this.nhomkhachhangService.addKhachhangToNhom(
        input.nhomId, 
        input.khachhangIds
      );
      return {
        success: true,
        message: `Đã thêm ${input.khachhangIds.length} khách hàng vào nhóm`,
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  @Mutation(() => NhomkhachhangMutationResponse, { 
    name: 'removeKhachhangFromNhom',
    description: 'Xóa khách hàng khỏi nhóm' 
  })
  async removeKhachhangFromNhom(
    @Args('input', new ValidationPipe({ transform: true })) input: ManageKhachhangInNhomInput
  ): Promise<NhomkhachhangMutationResponse> {
    try {
      const data = await this.nhomkhachhangService.removeKhachhangFromNhom(
        input.nhomId, 
        input.khachhangIds
      );
      return {
        success: true,
        message: `Đã xóa ${input.khachhangIds.length} khách hàng khỏi nhóm`,
        data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // =============== UTILITY QUERIES ===============

  @Query(() => [Nhomkhachhang], { 
    name: 'getAllNhomkhachhangSimple',
    description: 'Lấy tất cả nhóm khách hàng đơn giản (cho dropdown)' 
  })
  async getAllNhomkhachhangSimple(): Promise<Nhomkhachhang[]> {
    const result = await this.nhomkhachhangService.findAllNhomkhachhang(
      undefined, 
      { page: 1, limit: 1000 }, 
      { field: 'name', direction: 'asc' }
    );
    return result.data;
  }
}
