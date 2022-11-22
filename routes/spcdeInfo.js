/*  open api 에서 가져온 데이터를 tbl_holiday 테이블로 업데이트 */

import request from "request";
/* npm install --save request */
import scheduler from "node-schedule";
/* npm install --save node-schedule */
import DB from "../models/index.js";
const Holiday = DB.models.tbl_holiday;

import express from "express";

const router = express.Router();

const url =
  "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo";
const servicekey =
  "9sO%2BZVBC9mjTRJen1l4kyCib4qEKBjsmKRIWkI2U%2FCdv16CRM60dzGlagqOTQIwK0W1kpY4tG4Silvvhlf7H%2Fg%3D%3D";

// 내년 국경일(공휴일 + 제헌절) 정보 업데이트
let currentYear = new Date().getFullYear();

let queryParams = "?" + encodeURIComponent("serviceKey") + "=" + servicekey;
queryParams +=
  "&" +
  encodeURIComponent("solYear") +
  "=" +
  encodeURIComponent(`${currentYear}`);
//queryParams +=
//  "&" + encodeURIComponent("solMonth") + "=" + encodeURIComponent("12");
queryParams +=
  "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100");
queryParams +=
  "&" + encodeURIComponent("_type") + "=" + encodeURIComponent("json");

const option = {
  url: url + queryParams,
  method: "GET",
};

// cron 표현식, 초 분 시 일 월 년
// 매일 자정마다 scheduler 실행, 기본키 중복된 경우 update
const saveHoli = scheduler.scheduleJob("0 0 0 * * *", () => {
  request(option, async (error, response, body) => {
    // console.log("Status", response.statusCode);
    // console.log("Headers", JSON.stringify(response.headers));
    // console.log("Reponse received", body);
    let dataArr = {};
    try {
      let data = JSON.parse(body)["response"]["body"]["items"]["item"];
      for (let i in data) {
        let dateName = data[i]["dateName"];
        let isHoliday = data[i]["isHoliday"];
        let locdate = data[i]["locdate"];
        let seq = data[i]["seq"];
        dataArr = {
          h_dateName: dateName,
          h_isHoliday: isHoliday,
          h_locdate: locdate,
          h_seq: seq,
        };
        console.log(dataArr);
        await Holiday.create(dataArr);
      }
      console.log("DB insert");
    } catch (error) {
      Holiday.update(dataArr, { where: { h_locdate: dataArr.h_locdate } });
      console.log("DB update");
    }
  });
});

export default router;
