import "./style.css";
import { getComedians } from "./scripts/api";
import { initForm } from "./scripts/form";
import { createComedianBlock } from "./scripts/comedians";

const init = async () => {
  const bookingComediansList = document.querySelector(
    ".booking__comedians-list"
  );
  const bookingForm = document.querySelector(".booking__form");
  const countComedians = document.querySelector(
    ".event__info-item-comedians, .event__info-number"
  );
  const bookingInputFullname = document.querySelector(
    ".booking__input-fullname"
  );
  const bookingInputPhone = document.querySelector(".booking__input-phone");
  const bookingInputTicket = document.querySelector(".booking__input-ticket");

  const comedians = await getComedians();

  initForm(
    bookingForm,
    bookingInputFullname,
    bookingInputPhone,
    bookingInputTicket
  );
  if (comedians) {
    countComedians.textContent = comedians.length;
    const comedianBlock = createComedianBlock(comedians, bookingComediansList);
    bookingComediansList.append(comedianBlock);
  }
};
init();
