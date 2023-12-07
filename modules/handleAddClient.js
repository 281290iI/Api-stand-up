import { CLIENTS } from "../index.js";
import { readRequestBody } from "./helpers.js";
import { sendData, sendError } from "./send.js";
import fs from "node:fs/promises";

export const handleAddClient = async (req, res) => {
  try {
    const body = await readRequestBody(req);
    const newClient = JSON.parse(body);

    if (
      !newClient.fullName ||
      !newClient.phone ||
      !newClient.ticketNumber ||
      !newClient.booking
    ) {
      sendError(res, 400, "Неверные основные данные клиента");
      return;
    }

    if (
      newClient.booking &&
      (!newClient.booking.length ||
        !Array.isArray(newClient.booking) ||
        !newClient.booking.every((item) => item.comedian && item.time))
    ) {
      sendError(res, 400, "Неверно заполнены поля бронирования");
      return;
    }

    const clientData = await fs.readFile(CLIENTS, "utf8");
    const clients = JSON.parse(clientData);

    clients.push(newClient);

    await fs.writeFile(CLIENTS, JSON.stringify(clients));
    sendData(res, newClient);
  } catch (error) {
    console.trace(error);
    sendError(res, 500, "Ошибка сервера при чтении запроса");
  }
};
