document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.querySelector("table.calendar");
  const tbody = document.querySelector("table.calendar tbody");
  const btnPrev = document.querySelector("button.prev");
  const btnNext = document.querySelector("button.next");
  const btnToday = document.querySelector("button.today");
  const bgBlur = document.querySelector("div.bg_blur");
  const btnModalClose = document.querySelector("button.modal.btn_close");

  const time = new Date();

  const current = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    day: time.getDay(),
  };

  const today = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    day: time.getDay(),
  };

  const modal = {
    modal: document.querySelector("div.calendar.modal"),
    open() {
      this.modal.classList.add("visible");
      bgBlur.classList.add("active");
    },
    close() {
      this.modal.classList.remove("visible");
      bgBlur.classList.remove("active");
    },
  };

  const showNum = () => {
    const yearNum = document.querySelector("h2.year");
    const monthNum = document.querySelector("h1.month");
    yearNum.textContent = `${current.year}년`;
    monthNum.textContent = `${current.month}월`;
  };

  const fillZero = (num) => String(num).padStart(2, 0);

  const isToday = (arr) => {
    const todayArr = [
      `${today.year}${fillZero(today.month)}${fillZero(today.date)}`,
    ];
    return arr.every((ele) => todayArr.includes(ele));
  };

  const showHolidays = () => {
    for (let td of document.querySelectorAll("td")) {
      const tdClassArr = Array.from(td.classList);
      let dateTxt = td.querySelector(".date_txt");

      let holiTxt = document.createElement("div");
      holiTxt.classList.add("holi_txt");
      td.appendChild(holiTxt);

      // holiData: index.pug 에서 가져옴
      for (let item of holiData) {
        if (tdClassArr.includes(`${item.h_locdate}`)) {
          holiTxt.textContent = item.h_dateName;
          if (item.h_isHoliday === "Y") {
            holiTxt.style.color = "red";
            dateTxt.style.color = "red";
          }
        }
      }
    }
  };

  const showDate = () => {
    // lastDate: 이번 달 마지막 날짜 = 이번 달 날짜의 총 개수
    const lastDate = new Date(current.year, current.month, 0).getDate();
    // prevLastDate: 저번 달 마지막 날짜
    const prevLastDate = new Date(current.year, current.month - 1, 0).getDate();
    // prevMonthDays: 저번 달 마지막 날짜 요일 index + 1. 0(일요일)부터 시작하므로 요일 개수를 구하기 위해 + 1
    // 이번 달 첫 날짜 요일이 언제인지를 구하기 위함
    const prevMonthDays =
      new Date(current.year, current.month - 1, 0).getDay() + 1;

    /**
     * dateIndex.current : 이번 달 1일 ~ lastDate 까지 증가
     * dateIndex.prev : 이번 달 첫 주에서 표시할 저번 달의 시작 날짜(prevLastDate - 이전 요일 Index)
     *               prevMonthDays에서 + 1 했으므로 - 1
     * dateIndex.next : 이번 달 마지막 주에서 표시할 다음 달의 1일부터 증가
     */
    const dateIndex = {
      current: 1,
      prev: prevLastDate - (prevMonthDays - 1),
      next: 1,
    };

    tbody.textContent = "";

    for (let week = 0; week < 6; week++) {
      let tr = document.createElement("TR");

      for (let date = 0; date < 7; date++) {
        let td = document.createElement("TD");
        let dateTxt = document.createElement("div");
        dateTxt.classList.add("date_txt");
        td.appendChild(dateTxt);

        // prevMonthDays != 7: 저번 달 마지막 요일이 토요일(6 + 1 = 7)이면 이번 달은 일요일이므로 첫 주 공백이 없음
        const isPrevMonth =
          week === 0 && prevMonthDays != 7 && date < prevMonthDays;
        const isCurrentMonth = dateIndex.current <= lastDate;
        const isNextMonth = dateIndex.current > lastDate;

        if (isPrevMonth) {
          dateTxt.textContent = dateIndex.prev;
          let yyyy = current.month === 1 ? current.year - 1 : current.year;
          let mm = current.month === 1 ? "12" : fillZero(current.month - 1);
          let dd = fillZero(dateIndex.prev);
          td.classList.add(`${yyyy}${mm}${dd}`);
          td.classList.add("prevMonth");
          dateIndex.prev++;
        } else if (isCurrentMonth) {
          dateTxt.textContent = dateIndex.current;
          let yyyy = current.year;
          let mm = fillZero(current.month);
          let dd = fillZero(dateIndex.current);
          td.classList.add(`${yyyy}${mm}${dd}`);

          const tdClassArr = Array.from(td.classList);
          if (isToday(tdClassArr)) {
            td.classList.add("today");
            // schedule 임시 추가용
            const schedule = document.createElement("div");
            schedule.textContent = "schedule";
            schedule.classList.add("schedule");
            td.appendChild(schedule);
          }
          dateIndex.current++;
        } else if (isNextMonth) {
          dateTxt.textContent = dateIndex.next;
          let yyyy = current.month === 12 ? current.year + 1 : current.year;
          let mm = current.month === 12 ? "01" : fillZero(current.month + 1);
          let dd = fillZero(dateIndex.next);
          td.classList.add(`${yyyy}${mm}${dd}`);
          td.classList.add("nextMonth");
          dateIndex.next++;
        }
        tr.appendChild(td);
      } // 1주 for문 종료
      tbody.appendChild(tr);
    } // 1달 for문 종료

    showNum();
    showHolidays();
  };

  // 렌더링 완료 후 즉시 실행
  showDate();

  btnPrev?.addEventListener("click", () => {
    current.month--;
    if (current.month === 0) {
      current.month = 12;
      current.year--;
    }
    showNum();
    showDate();
  });
  btnNext?.addEventListener("click", () => {
    current.month++;
    if (current.month === 13) {
      current.month = 1;
      current.year++;
    }
    showNum();
    showDate();
  });
  btnToday?.addEventListener("click", () => {
    current.year = today.year;
    current.month = today.month;
    current.date = today.date;
    showDate();
  });

  // 이벤트 버블링 이용, schedule 클릭 시 modal 창과 bgBlur 띄우기
  calendar?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "schedule") {
      modal.open();
    }
  });

  // bgBlur나 modal 창의 close 버튼 클릭 시 modal 창과 bgBlur 닫기
  bgBlur?.addEventListener("click", () => {
    modal.close();
  });
  btnModalClose?.addEventListener("click", () => {
    modal.close();
  });

  const btnInfo = document.querySelector("button#btn_info");
  btnInfo?.addEventListener("click", () => {
    document.location.href = `/detail/${111}`;
  });
});
