// Hàm chuyển mã TG-XXYYYYY sang số thứ tự
export function DonhangcodeToNumber(code:any) {
  // Kiểm tra định dạng mã
  if (!code.match(/^TG-[A-Z]{2}\d{5}$/)) {
    throw new Error("Mã không đúng định dạng TG-XXYYYYY");
  }

  // Tách phần chữ cái và số
  const letters = code.slice(3, 5); // Lấy AA, AB,...
  const number = parseInt(code.slice(5), 10); // Lấy 00001, 00002,...

  // Chuyển phần chữ cái thành số (0-675)
  const letterValue = (letters.charCodeAt(0) - 65) * 26 + (letters.charCodeAt(1) - 65);

  // Tính số thứ tự (bắt đầu từ 1)
  return letterValue * 99999 + (number - 1) + 1;
}

// Hàm chuyển số thứ tự về mã TG-XXYYYYY
export function DonhangnumberToCode(number:any) {
  // Kiểm tra số thứ tự hợp lệ
  if (number < 1 || number > 676 * 99999) {
    throw new Error("Số thứ tự không hợp lệ");
  }

  // Trừ 1 vì số thứ tự bắt đầu từ 1
  number -= 1;

  // Tính phần chữ cái và số
  const letterValue = Math.floor(number / 99999);
  const numValue = (number % 99999) + 1;

  // Chuyển phần chữ cái thành hai chữ cái
  const firstLetter = String.fromCharCode(65 + Math.floor(letterValue / 26));
  const secondLetter = String.fromCharCode(65 + (letterValue % 26));

  // Định dạng phần số với 5 chữ số
  const numStr = numValue.toString().padStart(5, '0');

  // Tạo mã
  return `TG-${firstLetter}${secondLetter}${numStr}`;
}
export function DynamicnumberToCode(prefix: any, number: any, hasString: boolean) {
  // Kiểm tra số thứ tự hợp lệ
  if (number < 1 || number > 676 * 99999) {
    throw new Error("Số thứ tự không hợp lệ");
  }

  // Trừ 1 vì số thứ tự bắt đầu từ 1
  number -= 1;

  if (hasString) {
    // Trường hợp có chuỗi ký tự (như TG-XXYYYYY)
    const letterValue = Math.floor(number / 99999);
    const numValue = (number % 99999) + 1;

    // Chuyển phần chữ cái thành hai chữ cái
    const firstLetter = String.fromCharCode(65 + Math.floor(letterValue / 26));
    const secondLetter = String.fromCharCode(65 + (letterValue % 26));

    // Định dạng phần số với 5 chữ số
    const numStr = numValue.toString().padStart(5, '0');

    // Tạo mã với prefix-XXYYYYY
    return `${prefix}-${firstLetter}${secondLetter}${numStr}`;
  } else {
    // Trường hợp chỉ có số (như TG-YYYYY)
    const numStr = (number + 1).toString().padStart(5, '0');
    
    // Tạo mã với prefix-YYYYY
    return `${prefix}-${numStr}`;
  }
}