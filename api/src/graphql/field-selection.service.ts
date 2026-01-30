import { Injectable } from '@nestjs/common';
import * as graphqlFields from 'graphql-fields';
import { GraphQLResolveInfo } from 'graphql';

/**
 * Service for optimizing GraphQL field selection using graphql-fields
 * Automatically maps GraphQL field selections to Prisma select/include objects
 */
@Injectable()
export class FieldSelectionService {
  
  /**
   * Field name mapping to handle differences between GraphQL names and Prisma names
   * Maps lowercase or camelCase GraphQL names to the exact casing used in Prisma schema
   */
  private readonly globalFieldMapping: Record<string, string> = {
    'nhomncc': 'NhomNcc',
    'phieukho': 'PhieuKho',
    'sanphamkho': 'SanphamKho',
    'tonkho': 'TonKho',
    'phieukhosanpham': 'PhieuKhoSanpham',
    'donhangsanpham': 'Donhangsanpham',
    'dathangsanpham': 'Dathangsanpham',
    'banggiasanpham': 'Banggiasanpham',
    'chotkhodetail': 'chotkhodetail',
    'auditlog': 'AuditLog',
  };

  /**
   * Model-specific field mapping to avoid global conflicts
   */
  private readonly modelFieldMapping: Record<string, Record<string, string>> = {
    'nhacungcap': {
      'sanpham': 'Sanpham',
      'nhomncc': 'NhomNcc',
    },
    'sanpham': {
      'nhacungcap': 'Nhacungcap',
      'sanphamkho': 'SanphamKho',
      'tonkho': 'TonKho',
      'donhangsanpham': 'Donhangsanpham',
      'dathangsanpham': 'Dathangsanpham',
    }
  };

  /**
   * Extract field selections from GraphQL info and convert to Prisma select object
   */
  getFieldSelection(info: GraphQLResolveInfo, modelName?: string): any {
    try {
      const fields = graphqlFields(info);
      return this.convertFieldsToPrismaSelect(fields, modelName);
    } catch (error) {
      console.warn('⚠️ Field selection parsing failed, using default:', error.message);
      return undefined;
    }
  }

  /**
   * Public method to normalize a selection object (select or include)
   */
  normalizeSelection(selection: any, modelName?: string): any {
    if (!selection || typeof selection !== 'object') return selection;
    
    // We can reuse convertFieldsToPrismaSelect logic by pretending the input is graphql-fields output
    // But we need to handle the fact that selection might already be a Prisma-like object ({ select: ... } or { field: true })
    
    return this.convertPrismaObjectToNormalizedPrismaObject(selection, modelName);
  }

  /**
   * Helper to normalize an existing Prisma select/include object
   */
  private convertPrismaObjectToNormalizedPrismaObject(obj: any, modelName?: string): any {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
    
    const normalized: any = {};
    const normalizedModelName = modelName?.toLowerCase();
    
    for (let [key, value] of Object.entries(obj)) {
      let mappedKey = key;
      const normalizedKey = key.toLowerCase();
      
      // Apply mapping
      if (normalizedModelName && this.modelFieldMapping[normalizedModelName]?.[normalizedKey]) {
        mappedKey = this.modelFieldMapping[normalizedModelName][normalizedKey];
      } else if (this.globalFieldMapping[normalizedKey]) {
        mappedKey = this.globalFieldMapping[normalizedKey];
      }
      
      if (typeof value === 'object' && value !== null) {
        // Recursively normalize nested objects (could be { select: ... } or { include: ... } or just nested fields)
        normalized[mappedKey] = this.convertPrismaObjectToNormalizedPrismaObject(value);
        // Note: For now we lose modelName context in deep nesting unless we track relation targets
      } else {
        normalized[mappedKey] = value;
      }
    }
    
    return normalized;
  }

  /**
   * Convert GraphQL fields to Prisma select object
   */
  private convertFieldsToPrismaSelect(fields: any, modelName?: string): any {
    const select: any = {};
    const include: any = {};
    let hasRelations = false;
    let hasScalarFields = false;
    const normalizedModelName = modelName?.toLowerCase();

    for (let [fieldName, fieldValue] of Object.entries(fields)) {
      // ✅ Map field name if a mapping exists
      const normalizedFieldName = fieldName.toLowerCase();
      if (normalizedModelName && this.modelFieldMapping[normalizedModelName]?.[normalizedFieldName]) {
        fieldName = this.modelFieldMapping[normalizedModelName][normalizedFieldName];
      } else if (this.globalFieldMapping[normalizedFieldName]) {
        fieldName = this.globalFieldMapping[normalizedFieldName];
      }

      if (this.isScalarField(fieldName)) {
        select[fieldName] = true;
        hasScalarFields = true;
      } else if (this.isRelationField(fieldName, fieldValue)) {
        // Handle relation fields
        const nestedSelection = this.convertFieldsToPrismaSelect(fieldValue);
        include[fieldName] = nestedSelection;
        hasRelations = true;
      } else {
        // Default: include the field
        select[fieldName] = true;
        hasScalarFields = true;
      }
    }

    // Build the result object
    const result: any = {};
    
    if (hasScalarFields && Object.keys(select).length > 0) {
      result.select = select;
    }
    
    if (hasRelations && Object.keys(include).length > 0) {
      if (result.select) {
        // If we have both select and include, we need to add includes to select
        result.select = {
          ...result.select,
          ...include
        };
      } else {
        result.include = include;
      }
    }

    return Object.keys(result).length > 0 ? result : undefined;
  }

  /**
   * Check if a field is a scalar field (not a relation)
   */
  private isScalarField(fieldName: string): boolean {
    // Common scalar fields that are typically not relations
    const scalarFields = [
      'id', 'createdAt', 'updatedAt', 'name', 'email', 'title', 'description',
      'price', 'quantity', 'status', 'active', 'enabled', 'deleted',
      'slug', 'code', 'type', 'category', 'tag', 'value', 'count',
      'amount', 'total', 'subtotal', 'tax', 'discount',
      'firstName', 'lastName', 'phone', 'address', 'city', 'country',
      'zipCode', 'postalCode', 'website', 'company', 'position',
      'birthDate', 'gender', 'avatar', 'image', 'url', 'path',
      'content', 'body', 'summary', 'excerpt', 'metadata',
      'sort', 'order', 'priority', 'weight', 'score', 'rating',
      'views', 'likes', 'shares', 'comments', 'downloads',
      'version', 'revision', 'hash', 'checksum', 'signature'
    ];

    return scalarFields.includes(fieldName) || 
           fieldName.endsWith('Id') || 
           fieldName.endsWith('At') ||
           fieldName.endsWith('Count') ||
           fieldName.endsWith('Total') ||
           fieldName.startsWith('is') ||
           fieldName.startsWith('has') ||
           fieldName.startsWith('can');
  }

  /**
   * Check if a field is a relation field
   */
  private isRelationField(fieldName: string, fieldValue: any): boolean {
    // If the field value is an object with nested fields, it's likely a relation
    return typeof fieldValue === 'object' && 
           fieldValue !== null && 
           Object.keys(fieldValue).length > 0 &&
           !this.isScalarField(fieldName);
  }

  /**
   * Optimize field selection for specific models
   */
  optimizeForModel(modelName: string, selection: any): any {
    if (!selection) return selection;

    // Model-specific optimizations
    switch (modelName.toLowerCase()) {
      case 'user':
        return this.optimizeUserSelection(selection);
      case 'khachhang':
        return this.optimizeKhachhangSelection(selection);
      case 'sanpham':
        return this.optimizeSanphamSelection(selection);
      case 'donhang':
        return this.optimizeDonhangSelection(selection);
      default:
        return selection;
    }
  }

  /**
   * Optimize User model selection
   */
  private optimizeUserSelection(selection: any): any {
    // Always exclude sensitive fields unless explicitly selected
    if (selection.select) {
      const { password, refreshToken, ...safeSelect } = selection.select;
      
      // Fix roles relationship - User.roles points to UserRole[], not Role[]
      if (safeSelect.roles) {
        // If roles is requested, we need to include the proper nested structure
        safeSelect.roles = {
          include: {
            role: {
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
              }
            }
          }
        };
      }
      
      return {
        ...selection,
        select: safeSelect
      };
    }
    
    // If using include, also fix the roles relationship
    if (selection.include && selection.include.roles) {
      return {
        ...selection,
        include: {
          ...selection.include,
          roles: {
            include: {
              role: {
                select: {
                  id: true,
                  name: true,
                  createdAt: true,
                  updatedAt: true
                }
              }
            }
          }
        }
      };
    }
    
    return selection;
  }

  /**
   * Optimize Khachhang model selection
   */
  private optimizeKhachhangSelection(selection: any): any {
    // Add commonly needed fields if not specified
    if (selection.select && !selection.include) {
      return {
        ...selection,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          ...selection.select
        }
      };
    }
    return selection;
  }

  /**
   * Optimize Sanpham model selection
   */
  private optimizeSanphamSelection(selection: any): any {
    // Include stock information by default for products
    if (selection.select && !selection.include) {
      return {
        ...selection,
        select: {
          id: true,
          name: true,
          price: true,
          inStock: true,
          ...selection.select
        }
      };
    }
    return selection;
  }

  /**
   * Optimize Donhang model selection
   */
  private optimizeDonhangSelection(selection: any): any {
    // Include basic order information
    if (selection.select && !selection.include) {
      return {
        ...selection,
        select: {
          id: true,
          orderNumber: true,
          status: true,
          total: true,
          createdAt: true,
          ...selection.select
        }
      };
    }
    return selection;
  }

  /**
   * Merge custom select with field selection
   */
  mergeSelections(fieldSelection: any, customSelect?: any): any {
    if (!fieldSelection && !customSelect) return undefined;
    if (!fieldSelection) return customSelect;
    if (!customSelect) return fieldSelection;

    // Merge select objects
    const mergedSelect = {
      ...fieldSelection.select,
      ...customSelect
    };

    // Merge include objects
    const mergedInclude = {
      ...fieldSelection.include
    };

    const result: any = {};
    
    if (Object.keys(mergedSelect).length > 0) {
      result.select = mergedSelect;
    }
    
    if (Object.keys(mergedInclude).length > 0) {
      if (result.select) {
        result.select = {
          ...result.select,
          ...mergedInclude
        };
      } else {
        result.include = mergedInclude;
      }
    }

    return Object.keys(result).length > 0 ? result : undefined;
  }

  /**
   * Log field selection for debugging
   */
  logFieldSelection(modelName: string, selection: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 Field selection for ${modelName}:`, JSON.stringify(selection, null, 2));
    }
  }
}
