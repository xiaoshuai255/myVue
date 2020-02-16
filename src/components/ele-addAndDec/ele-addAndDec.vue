<template>
    <div class="addAndDec">
        <i class="remove icon-remove_circle_outline"
           v-show="food.count >0"
           @click="remove"
           ></i>
        <span class="text" v-show="food.count >0">{{food.count}}</span>
        <i class="add icon-add_circle"
           @click="add"
           ></i>
    </div>
</template>

<script>
  import PubSub from "pubsub-js"

  export default {
    name: "ele-addAndDec",
    props: {
      food: Object,
      goodIndex: Number,
      foodIndex: Number  //拿到goods里面对应的商家和食物的index
    },
    methods: {
      remove() {
        this.$emit("remove", this.food)  //发布
      },
      add(ev) {
        this.$emit("add", this.food)
        PubSub.publish("ballAnimation", ev.target)  //发布一个ballAnimation事件
      }
    }
  }
</script>

<style scoped lang="stylus">
    .addAndDec
        display inline-block

        .remove
            font-size 24px
            color rgba(0, 160, 220, 1)
            line-height 24px
            vertical-align middle

        .text
            display inline-block
            vertical-align middle
            font-size 10px
            color rgba(147, 153, 159, 1)
            line-height 24px
            width 22px
            text-align center

        .add
            vertical-align middle
            font-size 24px
            color rgba(0, 160, 220, 1)
            line-height 24px
</style>
