"use strict";

const flightTickets = [
  {
    pnr: "VN101",
    passengerName: "Nguyen Van An",
    flightNumber: "VN240",
    seatNumber: "12A",
    cabinClass: "ECONOMY",
    baggageWeight: 0,
    excessFee: 0,
    status: "BOOKED",
  },
  {
    pnr: "VN102",
    passengerName: "Tran Thi Mai",
    flightNumber: "VN240",
    seatNumber: "02C",
    cabinClass: "BUSINESS",
    baggageWeight: 0,
    excessFee: 0,
    status: "BOOKED",
  },
  {
    pnr: "VN103",
    passengerName: "Le Hoang Nam",
    flightNumber: "VN240",
    seatNumber: "15F",
    cabinClass: "ECONOMY",
    baggageWeight: 0,
    excessFee: 0,
    status: "BOOKED",
  },
];

const findTicketByPnr = (list, pnr) => {
  if (!pnr) return null;
  const targetPnr = pnr.trim().toUpperCase();
  for (let i = 0; i < list.length; i++) {
    if (list[i].pnr.toUpperCase() === targetPnr) {
      return list[i];
    }
  }
  return null;
};

const calculateExcessBaggageFee = (cabinClass, actualWeight) => {
  const allowance = cabinClass === "BUSINESS" ? 30 : 20;
  if (actualWeight <= allowance) {
    return 0;
  }
  const excessKg = actualWeight - allowance;
  return excessKg * 50000;
};

const displayBoardingPass = (ticket) => {
  console.log(`
=================================================================
|                       THẺ LÊN TÀU BAY                         |
|                        BOARDING PASS                          |
=================================================================
  Hành khách   : ${ticket.passengerName.padEnd(25, " ")} Chuyến bay : ${ticket.flightNumber}
  Mã đặt chỗ   : ${ticket.pnr.padEnd(25, " ")} Ghế        : ${ticket.seatNumber}
  Hạng vé      : ${ticket.cabinClass.padEnd(25, " ")} Trạng thái : ${ticket.status}
  Hành lý ký gửi: ${String(ticket.baggageWeight + " kg").padEnd(23, " ")} Phí quá cước: ${ticket.excessFee.toLocaleString("vi-VN")} VND
=================================================================`);
};

const listTickets = (list) => {
  if (list.length === 0) {
    console.log("Danh sách vé hiện đang trống.");
    return;
  }

  console.log(
    "===============================================================================================================",
  );
  console.log(
    "|                                      DANH SÁCH VÉ CHUYẾN BAY VN240                                          |",
  );
  console.log(
    "===============================================================================================================",
  );
  console.log(
    "| Mã PNR | Tên hành khách               | Số hiệu | Ghế  | Hạng vé   | Hành lý  | Phụ phí (VND)  | Trạng thái  |",
  );
  console.log(
    "---------------------------------------------------------------------------------------------------------------",
  );

  for (let i = 0; i < list.length; i++) {
    const t = list[i];
    const pnr = t.pnr.padEnd(6, " ");
    const name = t.passengerName.padEnd(28, " ");
    const flight = t.flightNumber.padEnd(7, " ");
    const seat = t.seatNumber.padEnd(4, " ");
    const cabin = t.cabinClass.padEnd(9, " ");
    const bag = (t.baggageWeight + " kg").padStart(8, " ");
    const fee = t.excessFee.toLocaleString("vi-VN").padStart(14, " ");
    const status = t.status.padEnd(11, " ");

    console.log(
      `| ${pnr} | ${name} | ${flight} | ${seat} | ${cabin} | ${bag} | ${fee} | ${status} |`,
    );
  }

  console.log(
    "===============================================================================================================",
  );
};

const checkInPassenger = (list) => {
  const pnrInput = prompt("Nhập mã PNR hành khách làm thủ tục:")
    ?.trim()
    .toUpperCase();
  const ticket = findTicketByPnr(list, pnrInput);

  if (!ticket) {
    alert(`Không tìm thấy thông tin vé với mã PNR: ${pnrInput}`);
    return;
  }

  if (ticket.status === "CHECKED_IN") {
    alert(
      `Hành khách ${ticket.passengerName} (PNR: ${ticket.pnr}) đã hoàn tất check-in trước đó.`,
    );
    return;
  }

  if (ticket.status === "CANCELLED") {
    alert(`Vé ${ticket.pnr} đã bị hủy, không thể thực hiện check-in.`);
    return;
  }

  const weightInput = prompt("Đặt hành lý lên cân và nhập trọng lượng (kg):");
  const actualWeight = parseFloat(weightInput);

  if (isNaN(actualWeight) || actualWeight < 0) {
    alert("Trọng lượng hành lý không hợp lệ!");
    return;
  }

  const allowance = ticket.cabinClass === "BUSINESS" ? 30 : 20;
  const excessFee = calculateExcessBaggageFee(ticket.cabinClass, actualWeight);

  ticket.baggageWeight = actualWeight;
  ticket.excessFee = excessFee;
  ticket.status = "CHECKED_IN";

  if (excessFee > 0) {
    alert(
      `Hành lý quá cước định mức (${actualWeight}kg / Miễn cước ${allowance}kg).\nPhụ phí quá cước cần thu: ${excessFee.toLocaleString("vi-VN")} VND`,
    );
  } else {
    alert(
      `Hành lý hợp lệ (${actualWeight}kg / Miễn cước ${allowance}kg). Không phát sinh phụ phí.`,
    );
  }

  displayBoardingPass(ticket);
  alert(
    `Check-in thành công! Đã xuất thẻ lên máy bay của ${ticket.passengerName} ra tab Console (F12).`,
  );
};

const searchTicket = (list) => {
  const keyword = prompt("Nhập mã PNR hoặc tên hành khách cần tìm:")
    ?.trim()
    .toLowerCase();
  if (!keyword) return;

  const matches = [];
  for (let i = 0; i < list.length; i++) {
    const pnrMatch = list[i].pnr.toLowerCase() === keyword;
    const nameMatch = list[i].passengerName.toLowerCase().includes(keyword);
    if (pnrMatch || nameMatch) {
      matches.push(list[i]);
    }
  }

  if (matches.length === 0) {
    alert("Không tìm thấy kết quả phù hợp.");
    return;
  }

  console.log(`\n=== KẾT QUẢ TÌM KIẾM THEO TỪ KHÓA: "${keyword}" ===`);
  listTickets(matches);
  alert(
    `Tìm thấy ${matches.length} kết quả. Đã hiển thị chi tiết trên Console (F12).`,
  );
};

const cancelTicket = (list) => {
  const pnrInput = prompt("Nhập mã PNR của vé cần hủy:")?.trim().toUpperCase();
  const ticket = findTicketByPnr(list, pnrInput);

  if (!ticket) {
    alert(`Không tìm thấy vé với mã PNR: ${pnrInput}`);
    return;
  }

  if (ticket.status === "CANCELLED") {
    alert("Vé này đã được hủy từ trước.");
    return;
  }

  const confirmCancel = confirm(
    `Xác nhận hủy vé của hành khách ${ticket.passengerName} (${ticket.pnr})?`,
  );
  if (confirmCancel) {
    ticket.status = "CANCELLED";
    alert(`Đã hủy vé ${ticket.pnr} thành công.`);
  }
};

const main = () => {
  let menuChoice = "";
  do {
    menuChoice = prompt(`================ QUẦY CHECK-IN SÂN BAY ================
1. Hiển thị danh sách vé chuyến bay dạng bảng
2. Tiếp nhận check-in, cân hành lý và tính phụ thu
3. Tra cứu vé theo mã PNR hoặc tên hành khách
4. Hủy vé theo yêu cầu
5. Thoát ca làm việc
-------------------------------------------------------
Vui lòng nhập lựa chọn (1-5):`);

    switch (menuChoice) {
      case "1":
        listTickets(flightTickets);
        alert("Đã xuất danh sách vé ra tab Console (F12).");
        break;
      case "2":
        checkInPassenger(flightTickets);
        break;
      case "3":
        searchTicket(flightTickets);
        break;
      case "4":
        cancelTicket(flightTickets);
        break;
      case "5":
        alert("Đã kết thúc ca làm việc.");
        break;
      default:
        if (menuChoice !== null) {
          alert("Lựa chọn không hợp lệ, vui lòng chọn lại từ 1 đến 5!");
        }
        break;
    }
  } while (menuChoice !== "5" && menuChoice !== null);
};

main();
