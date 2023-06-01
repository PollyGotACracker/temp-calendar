document.addEventListener("DOMContentLoaded", () => {
  const btnSearchDetail = document.querySelector("button.btn_search_detail");
  const searchDropdownBox = document.querySelector(
    ".search_detail_dropdown_box"
  );

  // search detail button 클릭하면 dropdown 표시, arrow 토글
  btnSearchDetail?.addEventListener("click", () => {
    searchDropdownBox.classList.toggle("visible");
    document
      .querySelector(".btn_search_detail_arrow")
      .classList.toggle("active");
  });
});
