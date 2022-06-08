<template>
  <div class="daily-offer-wrapper">
    <img class="header-background" :style="headerImage" />
    <div class="header">
      <div class="logo"><img src="@/assets/images/logo.svg" alt="logo" /></div>
      <div class="headercenter">
        <div class="sport-selector">
          <img @click="loadGames('football')" src="@/assets/images/fudbal.svg" alt="fudbal" />
        </div>
        <div class="sport-selector">
          <img @click="loadGames('basketball')" src="@/assets/images/kosarka.svg" alt="kosarka" />
        </div>
        <div class="sport-selector">
          <img @click="loadGames('tennis')" src="@/assets/images/tenis.svg" alt="tenis" />
        </div>
        <div class="sport-selector">
          <img @click="loadGames('hockey')" src="@/assets/images/hokej.svg" alt="hokej" />
        </div>
        <div class="sport-selector">
          <img @click="loadGames('handball')" src="@/assets/images/rukomet.svg" alt="rukomet" />
        </div>
        <div class="sport-selector">
          <img @click="loadGames('volleyball')" src="@/assets/images/odbojka.svg" alt="odbojka" />
        </div>
      </div>
      <div class="headerright">
        <div class="p1">
          <p>klikni na kvotu</p>
        </div>
        <div class="p2">
          <p>POPUNI TIKET</p>
        </div>
        <div class="p3">
          <p>18+</p>
        </div>
      </div>
    </div>

    <div class="navigate">
      <div class="navigatetop">
        <div class="navigatetop left">
          <div class="mostpopularmatches">
            <p>Najigraniji mecevi</p>
          </div>
          <table class="table">
            <tr>
              <td class="tips">1</td>
              <td class="tips">X</td>
              <td class="tips">2</td>
            </tr>
          </table>
        </div>
        <div class="navigatetop right">
          <table class="table">
            <tr>
              <td class="tips">1</td>
              <td class="tips">X</td>
              <td class="tips">2</td>
            </tr>
          </table>
        </div>
      </div>
      <template v-if="activeSportGames.length">
        <div class="navigateleft">
          <div class="bid" v-for="game in activeSportGames" :key="game.game_id">
            <div class="matches">
              <div>
                <div class="time">
                  <p>{{ game.start }}</p>
                </div>
                <div class="match">
                  <p>{{ game.home_team }}<br />{{ game.away_team }}<br /></p>
                </div>
              </div>
            </div>
            <div class="numberofgames">
              <p>155</p>
            </div>
            <table class="table">
              <tr>
                <td v-for="quota in game.quotas" @click="selectGameQuota(game.game_id, quota.quota_id)"
                  :key="quota.quota_id" :class="{ selected: quota.selected }">
                  {{ quota.quota }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no-data">Trenutno nema mečeva za izabrani sport.</div>
      </template>
      <div class="downborderbottom"></div>
    </div>
    <div class="page">
      <div class="one">1</div>
      <div class="one">2</div>
      <div class="one">3</div>
      <div class="one">4</div>
      <div class="one">5</div>
      <div class="one">6</div>
      <div class="one">7</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DailyOffer",
  data: () => ({
    activeSportGames: [],
    limit: 8,
  }),
  computed: {
    ...mapGetters([
      "getAllGames",
      "getGamesBySport",
      "getPaginatedGamesBySport",
    ]),
    headerImage() {
      return (
        "background-image : url('" +
        require("@/assets/images/background-stadium.svg") +
        "'); background-size: cover;"
      );
    },
  },
  mounted() {
    this.activeSportGames = this.getPaginatedGamesBySport(
      "football",
      1,
      this.limit
    );
  },
  methods: {
    selectGameQuota(gameId, quotaId) {
      const game = this.activeSportGames.find(
        (game) => game.game_id === gameId
      );
      if (game) {
        game.quotas.forEach((quota) => {
          quota.selected = quota.quota_id === quotaId;
        });
      }
    },
    loadGames(sport) {
      this.activeSportGames = this.getPaginatedGamesBySport(
        sport,
        1,
        this.limit
      );
    },
  },
};
</script>

<style>
/*
    font-weight: 400;
*/
@font-face {
  font-family: ProximaNovaRegular;
  src: url("https://cdn.mozzartbet.com/public/fonts/ProximaNovaRegular.otf");
}

/*
  font-weight: 600;
*/
@font-face {
  font-family: ProximaNovaSemiBold;
  src: url("https://cdn.mozzartbet.com/public/widgets/ProximaNovaSemibold.otf");
}

body {
  background-color: #2a2d35;
  padding: 0;
  margin: 0;
}

.daily-offer-wrapper {
  width: 847px;
  margin: auto;
  position: relative;
}

.header {
  background: #280071;
  height: 56px;
  display: flex;
  justify-content: space-between;
  height: 56px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  opacity: 0.8;
}

.header-background {
  width: 100%;
  height: 56px;
}

.logo {
  width: 140px;
  height: 32px;
  padding-left: 8px;
  padding-top: 12px;
  display: flex;
}

.headercenter {
  display: flex;
  /* justify-content: space-between;*/
  align-items: center;
}

.headercenter img {
  cursor: pointer;
}

.sport-selector {
  width: 20px;
  height: 20px;
  justify-self: center;
  margin-right: 16px;
  /*margin: auto 16px auto 0;*/
}

.headerright {
  display: flex;
}

.p1 {
  font-family: "ProximaNovaRegular";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: #ffffff;
  padding-right: 5px;
  padding-top: 11px;
}

.p2 {
  font-family: "ProximaNovaSemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #ffffff;
  text-shadow: 0px 0px 7px #ffffff;
  padding-right: 7px;
  padding-top: 9px;
}

.p3 {
  padding-right: 9px;
  padding-top: 13px;
}

.p3 p {
  width: 14px;
  height: 14px;
  border: 0.777778px solid #a9a9a9;
  border-radius: 100%;
  font-family: "ProximaNovaSemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 6.68181px;
  line-height: 14px;
  color: #a9a9a9;
  text-align: center;
}

.navigateleft {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.mostpopularmatches {
  font-family: "ProximaNovaRegular";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.02em;
  color: #40a3ff;
  text-shadow: 0px 0px 10px rgba(64, 163, 255, 0.6);
}

.mostpopularmatches p {
  padding-left: 9px;
}

.navigatetop {
  display: flex;
  height: 26px;
}

.navigatetop.left {
  width: 415px;
  display: flex;
}

.navigatetop .table {
  margin-left: auto;
}

.navigatetop .tips {
  font-family: "ProximaNovaSemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  background: none;
  box-shadow: none;
  cursor: auto;
}

.navigatetop.right {
  width: 415px;
  margin-left: 8px;
}

.matches {
  margin-right: auto;
  display: flex;
  padding-left: 8px;
}

.borderbottom {
  margin-left: 8px;
  margin-top: 4px;
  width: 405px;
  height: 1px;
  background: #41444d;
}

.time {
  font-family: "ProximaNovaRegular";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #fdb913;
}

.time p {
  margin: 0;
}

.match p {
  font-family: "ProximaNovaSemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

.bid {
  width: 415px;
  height: 44px;
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}

.bettingodds {
  float: left;
}

.table tr td {
  width: 62px;
  height: 38px;
  background: #41444d;
  border-radius: 2px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  font-family: "ProximaNovaSemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}

.table tr td.selected {
  background: lime;
}

.navigateright {
  float: left;
}

.gametips {
  padding-top: 4px;
  font-family: "ProximaNovaSemiBold";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
}

.gametips.last {
  margin-left: auto;
}

.bettingodds table {
  width: 100%;
}

table {
  display: flex;
  justify-content: space-between;
}

.numberofgames {
  display: flex;
  justify-content: space-between;
  padding-left: 80px;
  padding-right: 8px;
  padding-top: 27px;
  margin-bottom: 0;
  font-family: "ProximaNovaRegular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: right;
  color: #40a3ff;
  text-shadow: 0px 0px 10px #40a3ff;
}

.numberofgames p {
  margin: 0;
}

.downborderbottom {
  float: left;
  width: 837px;
  height: 1px;
  background: #41444d;
  margin-top: 4px;
  margin-left: 8px;
}

.no-data {
  margin: 10px;
  color: darkred;
}
</style>
