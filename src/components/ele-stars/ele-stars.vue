<template>
    <div class="stars" :class="`stars-${size}`">
        <div class="star " v-for="item in starNum" :class="item"></div>
    </div>
</template>

<script>
  const ON = "on";
  const HALF = "half";
  const OFF = "off";
  const arrLength = 5;  //星的总数
  export default {
    props: {
      size: String,
      score: Number
    },
    computed: {
      starNum() {
        let arr = [];
        const score = Math.floor(this.score);  //算出的整星数量
        const starHalf = this.score - score; //小数=传过来的数-上面得出的整数
        for (let i = 0; i < score; i++) {
          arr.push(ON)
        }
        if (starHalf >= 0.5){
          arr.push(HALF)
        }else{
          arr.push(OFF)
        }
        while (arr.length < arrLength){
          arr.push(OFF)
        }
        return arr
      }
    },
    name: "ele-stars"
  }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .stars
        display inline-flex

        .star
            background-size 100% 100%
            background-repeat no-repeat

        &.stars-48
            .star
                width 20px
                height 20px
                margin-right 20px

                &:last-child
                    margin-right 0

                &.on
                    bg-image(star48_on)

                &.half
                    bg-image(star48_half)

                &.off
                    bg-image(star48_off)

        &.stars-36
            .star
                width 15px
                height 15px
                margin-right 15px

                &:last-child
                    margin-right 0

                &.on
                    bg-image(star36_on)

                &.half
                    bg-image(star36_half)

                &.off
                    bg-image(star36_off)

        &.stars-24
            .star
                width 10px
                height 10px
                margin-right 10px

                &:last-child
                    margin-right 0

                &.on
                    bg-image(star24_on)

                &.half
                    bg-image(star24_half)

                &.off
                    bg-image(star24_off)
</style>
