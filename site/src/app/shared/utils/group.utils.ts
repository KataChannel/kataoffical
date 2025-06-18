/**
 * Groups an array of objects by a specified field and creates a child array for each group.
 *
 * This function takes an input array of objects and groups them based on the value of the specified `byField`.
 * For each unique value in `byField`, it creates an object that includes:
 *  - The grouping field (using the key defined by `byField`).
 *  - An array of child objects under the key defined by `childrenField`. Each child object is a copy of the original object
 *    with the grouping field and the fields "Receiver", "Sender", and "Type" removed.
 *  - If present, the fields "Receiver", "Sender", and "Type" are copied to the group object.
 *
 * @param data - The array of objects to be grouped.
 * @param byField - The property name used to group the objects.
 * @param childrenField - The property name under which the grouped child objects will be stored.
 *
 * @example
 * // Given:
 * const data = [
 *   { category: 'fruits', name: 'apple', Receiver: 'John', Type: 'food' },
 *   { category: 'fruits', name: 'banana', Receiver: 'John', Type: 'food' },
 *   { category: 'vegetables', name: 'carrot', Sender: 'Jane', Type: 'organic' }
 * ];
 *
 * // Calling the function:
 * const result = groupAndCreateChild(data, 'category', 'items');
 *
 * // The result will be:
 * [
 *   {
 *     category: 'fruits',
 *     Receiver: 'John',
 *     Type: 'food',
 *     items: [
 *       { name: 'apple' },
 *       { name: 'banana' }
 *     ]
 *   },
 *   {
 *     category: 'vegetables',
 *     Sender: 'Jane',
 *     Type: 'organic',
 *     items: [
 *       { name: 'carrot' }
 *     ]
 *   }
 * ]
 *
 * @returns An array of grouped objects, each containing the grouping field value, optional properties (Receiver, Sender, Type),
 * and an array of child objects stored under the specified `childrenField`.
 */
/**
 * Groups the provided array of objects based on a specified property and aggregates the remaining properties into a child array.
 *
 * This function creates a new grouping object for each unique value in the field specified by `groupBy`. It removes the grouping property from each data object for the child elements.
 * Additionally, if any properties provided in the `dynamicFields` array exist in the data object, they are copied to the group object and removed from the child object.
 *
 * @param data - The array of objects to group.
 * @param groupBy - The key used to group the objects. This property is also retained in the resulting group object.
 * @param childrenField - The key under which the array of child objects (which are copies of the original objects minus the groupBy and dynamic fields) is stored.
 * @param dynamicFields - An optional array of property names to be copied from the first occurrence of each group to the group object.
 *
 * @returns An array of grouped objects. Each group object contains:
 *   - The grouping value for the `groupBy` key.
 *   - An array of child objects under the key specified by `childrenField`, with the `groupBy` and any `dynamicFields` removed.
 *   - Any dynamic fields (if present) are included at the group level from the first matching record.
 *
 * @example
 * // Given the following input:
 * const data = [
 *   { category: 'fruit', name: 'apple', color: 'red', size: 'medium' },
 *   { category: 'fruit', name: 'banana', color: 'yellow', size: 'medium' },
 *   { category: 'vegetable', name: 'carrot', color: 'orange', size: 'small' }
 * ];
 * const groupBy = 'category';
 * const childrenField = 'items';
 * const dynamicFields = ['color'];
 *
 * // The function call:
 * const result = groupAndCreateChild(data, groupBy, childrenField, dynamicFields);
 *
 * // Would produce the following output:
 * // [
 * //   {
 * //     category: 'fruit',
 * //     color: 'red',
 * //     items: [
 * //       { name: 'apple', size: 'medium' },
 * //       { name: 'banana', size: 'medium' }
 * //     ]
 * //   },
 * //   {
 * //     category: 'vegetable',
 * //     items: [
 * //       { name: 'carrot', color: 'orange', size: 'small' }
 * //     ]
 * //   }
 * // ]
 */
export function groupAndCreateChild(
    data: any[],
    groupBy: string,
    childrenField: string,
    dynamicFields: string[] = []
) {
    return Object.values(
        data.reduce((acc: any, curr: any) => {
            const groupValue = curr[groupBy];
            // Copy current record and remove the groupBy property.
            const rest = { ...curr };
            delete rest[groupBy];

            // Always remove dynamic fields from the child object.
            dynamicFields.forEach(key => {
                delete rest[key];
            });

            // If the group doesn't exist, create it and copy dynamic fields if available.
            if (!acc[groupValue]) {
                const groupObj: any = {
                    [groupBy]: groupValue,
                    [childrenField]: []
                };

                dynamicFields.forEach(key => {
                    if (curr[key] !== undefined) {
                        groupObj[key] = curr[key];
                    }
                });

                acc[groupValue] = groupObj;
            }

            acc[groupValue][childrenField].push(rest);
            return acc;
        }, {})
    );
}