<template>
  <el-card class='box-card-component' style='margin-left: 8px;'>
    <div slot="header" class="box-card-header">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
    </div>
    <div style="position: relative;">
      <PanThumb :image='avatar' class='panThumb'></PanThumb>
      <div style='padding-top: 35px;' class='process-item'>
        <span>vue</span>
        <el-progress :percentage='70'></el-progress>
      </div>
      <div class='process-item'>
        <span>react</span>
        <el-progress :percentage='60'></el-progress>
      </div>
      <div class='process-item'>
        <span>webpack</span>
        <el-progress :percentage='50'></el-progress>
      </div>
      <div class='process-item'>
        <span>Eslint</span>
        <el-progress :percentage='100' status="success"></el-progress>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'


export default {
  name: 'BoxCard',
  components: {
    PanThumb
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}
</style>
<style scoped>
.panThumb >>> .pan-info {
  box-shadow: none !important;
}
</style>

<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .panThumb {
    position: absolute;
    top: -45px;
    left: 0;
    width: 70px !important;
    height: 70px !important;
    z-index: 100;
    border: 5px solid #fff;
    background-color: #fff;
    box-shadow: none !important;
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }

  @media only screen and (max-width: 1510px) {
    .mallki-text {
      display: none;
    }
  }
}
</style>
