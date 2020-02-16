<template>
    <div>
        <div class="shopCard">
            <div class="left">
                <div class="cardWrap">
                    <div class="logo" :class="{highLight:totalPrice>0}" @click="showCard">
                        <i class="shopping_cart icon-shopping_cart"></i>
                    </div>
                    <span class="qipao" v-show="totalCount>0">{{totalCount}}</span>
                </div>
                <div class="price">
                    <span :class="{highLight:totalPrice>0}">￥{{totalPrice}}</span>
                </div>
                <div class="deliveryPrice">
                    <span>另需配送费￥{{deliveryPrice}}元</span>
                </div>
            </div>
            <div class="right" :class="{highLight:totalPrice>=minPrice}">
                <span>{{payPrice}}</span>
            </div>
            <div class="balls">
                <div class="ballWrap" v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <i class="ball" v-show="ball.show"></i>
                    </transition>
                </div>
            </div>
        </div>
        <transition name="shopCartList">
            <div class="list" v-show="showList">
                <div class="header">
                    <span class="shop-card">购物车</span>
                    <span class="clear" @click="clear">清空</span>
                </div>
                <div class="content" ref="shopCardContent">
                    <ul class="goodList">
                        <li class="goodItem" v-for="selectFood in selectFoods">
                            <span class="goodName">{{selectFood.name}}</span>
                            <div class="goodRight">
                                <span class="price">￥{{selectFood.count * selectFood.price}}</span>
                                <ele-addAndDec class="addAndDec"
                                               :food="selectFood"
                                               @add="add"
                                               @remove="remove">
                                </ele-addAndDec>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <div class="cover" v-show="showList" @click="showCover"></div>
    </div>
</template>

<script>
  import PubSub from "pubsub-js"
  import {transform} from "../../util";
  import addAndDec from "components/ele-addAndDec/ele-addAndDec.vue"
  import BScroll from 'better-scroll'

  export default {
    name: "ele-card",
    props: {
      minPrice: Number,
      deliveryPrice: Number,
      selectFoods: Array
    },
    components:{
      "ele-addAndDec": addAndDec,
    },
    data() {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        showList:false
      }
    },
    methods: {
      drop(target) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.target = target
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop(el) {
        //计算小球开始的位置
        let count = this.balls.length
        while (count--) {  //相当于循环了5次
          let ball = this.balls[count]
          if (ball.show) {
            let viewH = document.documentElement.clientHeight; //获取视口的高度
            let targetRect = ball.target.getBoundingClientRect()  //获取触发事件的位置
            let translateX = targetRect.left - 32
            let translateY = viewH - targetRect.top - 22

            transform(el, "translateX", translateX + 3)
            transform(el, "translateY", -translateY + 20)
          }
        }
      },
      dropping(el) {
        //让浏览器清空整个渲染队列
        let hook = el.offsetHeight;
        this.$nextTick(() => {
          transform(el, "translateX", 0)
          transform(el, "translateY", 0)
        })
      },
      afterDrop(el) {
        const ball = this.dropBalls.shift();
        if (ball.show) {
          ball.show = false
          el.style.display = "none"
        }
      },
      showCard(){
        if (this.totalCount>0){
          this.showList = !this.showList
        }else{
          this.showList =false
        }
      },
      clear(){
        this.$emit("clear")
        this.showList = !this.showList
      },
      add(food){
        this.$emit("add",food)
      },
      remove(food){
        this.$emit("remove",food)
        if (this.totalCount <= 0){
          this.showList = false
        }
      },
      showCover(){
        this.showList = !this.showList
      }
    },
    computed: {
      totalCount() {
        let totalCount = 0;
        this.selectFoods.forEach((food) => {
          totalCount += food.count
        })
        return totalCount
      },
      totalPrice() {
        let totalPrice = 0;
        this.selectFoods.forEach((food) => {
          totalPrice += (food.count * food.price)
        })
        return totalPrice
      },
      payPrice() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          return `差${this.minPrice - this.totalPrice}起送`
        } else {
          return `去结算`
        }
      },

    },
    mounted() {
      PubSub.subscribe("ballAnimation", (msg, target) => {   //订阅ballAnimation事件
        this.drop(target)
      })
      new BScroll(this.$refs.shopCardContent,{
        click:true
      })
    }
  }
</script>

<style scoped lang="stylus">
    .shopCard
        display flex
        position fixed
        bottom 0
        left 0
        background-color #141d27
        width 100%
        height 48px
        z-index 6
        .left
            flex 1
            display flex

            .cardWrap
                display flex
                justify-content center
                align-items center
                width 56px
                height 56px
                border-radius 50%
                margin-left 12px
                margin-right 8px
                position relative
                top -12px
                background-color #141d27
                z-index 2

                .logo
                    width 44px
                    height 44px
                    border-radius 50%
                    display flex
                    justify-content center
                    align-items center
                    background-color rgba(255, 255, 255, .2)
                    z-index 2

                    &.highLight
                        background-color rgba(0, 160, 220, 1)

                        .shopping_cart
                            color rgba(255, 255, 255, 1)

                    .shopping_cart
                        font-size 24px
                        color rgba(255, 255, 255, 0.4)
                        line-height 24px

                .qipao
                    position absolute
                    right 0
                    top 0
                    width 24px
                    height 16px
                    border-radius 6px
                    color #ffffff
                    text-align center
                    background rgba(240, 20, 20, 1)
                    box-shadow 0px 4px 8px 0px rgba(0, 0, 0, .4)
                    font-size 9px
                    line-height 16px
                    z-index 5

            .price
                display flex
                align-items center
                justify-content center

                span
                    padding-right 12px
                    font-size 16px
                    font-weight 700
                    color rgba(255, 255, 255, .4)
                    line-height 24px
                    border-right 1px solid rgba(255, 255, 255, 0.3)

                    &.highLight
                        color rgba(255, 255, 255, 1)

            .deliveryPrice
                display flex
                align-items center
                justify-content center
                padding-left 12px

                span
                    padding-right 8px
                    font-size 15px
                    font-weight 200
                    color rgba(255, 255, 255, .4)
                    line-height 24px

                    .highLight
                        color rgba(255, 255, 255, 1)

        .right
            flex 0 0 100px
            display flex
            justify-content center
            align-items center
            background-color rgba(255, 255, 255, .1)

            &.highLight
                background-color rgba(0, 160, 220, 1)

                span
                    font-size 18px
                    color rgba(255, 255, 255, 1)

            span
                font-size 15px
                color rgba(255, 255, 255, .5)
                font-weight 700
                line-height 24px

        .balls
            .ballWrap
                .ball
                    position absolute
                    left 32px
                    top 8px
                    width 16px
                    height 16px
                    border-radius 50%
                    background-color #e74c3c
                    transition .5s transform linear
    .list
        position absolute
        left 0
        bottom 0
        height 258px
        width 100%
        background-color rgba(255,255,255,1)
        z-index 5
        .header
            height 40px
            width 100%
            background-color #f3f5f7
            border-bottom 1px solid rgba(7,17,27,0.1)
            .shop-card
                float left
                font-size 15px
                font-weight 200
                color rgba(7,17,27,1)
                line-height 40px
                margin-left 18px
            .clear
                float right
                font-size 13px
                color rgba(0,160,220,1)
                line-height 40px
                margin-right 18px

        .content
            width 100%
            max-height 218px
            overflow hidden
            .goodList
                padding 0 18px
                .goodItem
                    position relative
                    height 48px
                    line-height 48px
                    display flex
                    align-items center
                    border-bottom 1px solid rgba(7,17,27,.1)
                    .goodName
                        font-size 14px
                        color rgba(7,17,27,1)
                        line-height 48px
                        font-weight 700
                    .goodRight
                        display flex
                        align-items center
                        position absolute
                        right 0px
                        top 0
                        .price
                            margin-left 18px
                            margin-right 12px
                            font-size 14px
                            color rgba(240,20,20,1)
                            font-weight 700

    .cover
        width 100%
        height 100%
        background-color rgba(7,17,27,.6)
        position fixed
        top 0
        left 0
        backdrop-filter blur(10px)
</style>
