<template>
  <div class="dataTools">
    <header class="dateOperation">
      <button @click="preMonth()">上一月</button>
      <p>{{ currentYear }}年{{ currentMonth + 1 }}月{{ currentDay }}日</p>
      <button @click="nextMonth()">下一月</button>
    </header>
    <main>
      <ul>
        <!-- 列名 周日~周六 -->
        <li class="dateHeader" v-for="(item, index) in dateRow" :key="index">
          {{ item }}
        </li>
      </ul>
      <ul>
        <li
          class="dateHeader"
          v-for="(item, index) in dateList"
          :key="index"
          @click="checkItem(item)"
          :class="{
            'fc-000': item.isCurrentMonth,
            'fc-gray': !item.isCurrentMonth,
            'bg-closed': item.isToday,
          }"
        >
          {{ item.value }}
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: "dateTools",
  data() {
    return {
      currentYear: "",
      currentMonth: "",
      currentDay: "",
      dateRow: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dateList: [],
      daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    };
  },
  methods: {
    // 获取目标月初是星期几
    getWeekday(year, month) {
      let date = new Date(year, month, 1);
      return date.getDay();
    },
    // 上一月
    preMonth() {
      let _ = this;
      --_.currentMonth;
      if (_.currentMonth < 1) {
        _.currentYear -= 1;
        _.currentMonth = 11;
      }
      _.getMonth();
    },
    // 下一月
    nextMonth() {
      let _ = this;
      ++_.currentMonth;
      console.log(_.currentMonth > 12);
      console.log(_.currentMonth, 12);
      if (_.currentMonth > 11) {
        _.currentYear += 1;
        _.currentMonth = 0;
      }
      _.getMonth();
    },
    checkItem(item) {
      let _ = this;
      if (item.type == "pre") {
        _.preMonth();
      } else if (item.type == "next") {
        _.nextMonth();
      }
    },
    getMonth() {
      let _ = this;
      _.daysInMonth[1] = _.isLeapYear(_.currentYear) ? 29 : 28;
      let currentMonthDaysLength = _.daysInMonth[_.currentMonth]; // 当前月的天数
      let currentMonthFisrtDay = _.getWeekday(_.currentYear, _.currentMonth); // 当前月第一天是星期几？
      let previousMonthDays = []; // 上月
      let currentMonthDays = []; // 当月
      let nextMonthDays = []; // 下月
      // 上月展示
      for (let i = 0; i < currentMonthFisrtDay; i++) {
        previousMonthDays[i] = {
          value: i + 1,
          type: "pre",
          isCurrentMonth: false,
        };
      }
      // 当前月展示
      for (let i = 0; i < currentMonthDaysLength; i++) {
        if (_.currentDay == i + 1) {
          currentMonthDays[i] = {
            value: i + 1,
            isCurrentMonth: true,
            isToday: true,
          };
        } else {
          currentMonthDays[i] = {
            value: i + 1,
            isCurrentMonth: true,
          };
        }
      }
      // 下月展示
      for (
        let i = 0;
        i < _.dateList.length - (currentMonthFisrtDay + currentMonthDaysLength);
        i++
      ) {
        nextMonthDays[i] = {
          value: i + 1,
          type: "next",
          isCurrentMonth: false,
        };
      }
      _.dateList = [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays,
      ];
      console.log(_.dateList);
    },
    // 判断当年是不是闰年
    isLeapYear(currentYear) {
      return (
        (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
        currentYear % 400 === 0
      );
    },
  },
  created() {
    this.dateList = Array(42)
      .fill()
      .map((e, index) => {
        return {
          isCurrentMonth: false,
        };
      });
    let _ = this;
    _.currentYear = new Date().getFullYear();
    _.currentMonth = new Date().getMonth();
    _.currentDay = new Date().getDate();
    _.getMonth();
  },
};
</script>
<style lang="scss" scoped>
//风格主题色
$fff: rgb(255, 255, 255); //背景色
$gray: #c0c4cc;
$black: #000000;
$blue: #e6f1fc;

// 色值  字体色、背景色、边框色
$colors: (
  "fff": $fff,
  "gray": $gray,
  "000": $black,
  "closed": $blue,
);

@each $key, $val in $colors {
  .fc-#{$key} {
    color: $val;
  }

  .bg-#{$key} {
    background-color: $val;
  }

  .bdc-#{$key} {
    border-color: $val;
  }
}
.dateOperation {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.dataTools {
  padding: 20px;
}
main {
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
}
ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  li {
    list-style: none;
    flex: 0 0 14.285%;
    font-size: 18px;
  }
}
.dateHeader {
  cursor: pointer;
  min-width: 14.285%;
  min-height: 14.285%;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  transition: 0.7s;
  box-sizing: border-box;
}
.dateHeader:hover {
  background-color: #e6f1fc;
  z-index: 2;
  position: relative;
}
</style>