<template>
    <div class="goods">
        <div class="menuWrap" ref="menuWrap">
            <ul class="menuList" ref="menuList">
                <li class="menuItem" v-for="(good,index) in goods"
                    :class="{active:currentIndex === index}"
                    @click="handleForMenuList(index)">
                    <ele-icon class="icon" :size="3" :type="good.type"></ele-icon>
                    <span class="text">{{good.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foodsWrap" ref="foodsWrap">
            <ul class="foodsList" ref="foodsList">
                <li class="foodsItem" v-for="(good,goodIndex) in goods">
                    <h2>{{good.name}}</h2>
                    <ul class="foodList">
                        <li class="foodItem" v-for="(food,foodIndex) in good.foods">
                            <div class="left">
                                <img :src="food.image">
                            </div>
                            <div class="right">
                                <div class="name">{{food.name}}</div>
                                <div class="description">{{food.description}}</div>
                                <div class="count">
                                    <span class="sellCount">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="prices">
                                    <span class="nowPrice">￥{{food.price}}</span>
                                    <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <ele-addAndDec class="addAndDec" :food="food" :goodIndex="goodIndex"
                                               :foodIndex="foodIndex"
                                               @add="add" @remove="remove">
                                </ele-addAndDec>
                            </div>

                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <ele-card :selectFoods="selectFoods"
                  :deliveryPrice="seller.deliveryPrice"
                  :minPrice="seller.minPrice"
                  @clear="clear"
                  @add="add"
                  @remove="remove"></ele-card>
    </div>
</template>

<script>
  import icon from "components/ele-icon/ele-icon.vue"
  import addAndDec from "components/ele-addAndDec/ele-addAndDec.vue"
  import shopCard from "components/ele-card/ele-card.vue"
  import BScroll from 'better-scroll'

  const OK = 0
  export default {
    name: "goods",
    props: {
      seller: Object
    },
    data() {
      return {
        goods: [],
        scrollY: 0,  //滑动的距离
        tops: []   //所有li的高度组成的数组
      }
    },
    components: {
      "ele-icon": icon,
      "ele-addAndDec": addAndDec,
      "ele-card": shopCard
    },
    methods: {
      clear() {
        this.selectFoods.forEach((selectFood) => {
          selectFood.count = 0
        })

      },
      add(food) {
        /*let food = this.goods.find((good, index) => index === goodIndex)
          .foods.find((food, index) => index === foodIndex)*/
        if (!food.count) {
          this.$set(food, "count", 1)
        } else {
          food.count++
        }
      },
      remove(food) {
        /*let food = this.goods.find((good, index) => index === goodIndex)
          .foods.find((food, index) => index === foodIndex)*/
        if (food.count > 0) {
          food.count--
        }
      },
      handleForMenuList(index) { //index代表点击的是第几个导航栏
        const top = this.tops[index];  //点击的导航栏所对应右侧的内容
        this.foodsScroll.scrollTo(0, -top, 300)
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrap, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on("scroll", ({x, y}) => {
          this.scrollY = Math.abs(y)  //滑动的距离
        })
      },
      _initTops() {
        let liNodes = this.$refs.foodsList.children; //拿到右侧每一个li的节点
        let top = 0;
        let tops = [top];
        Array.from(liNodes).forEach((liNode) => {
          top += liNode.offsetHeight;  //每个li的高度
          tops.push(top)  //所有li高度组成的数组
        })
        this.tops = tops
      }
    },
    computed: {
      selectFoods() {
        let selectFoods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count > 0) {
              selectFoods.push(food)
            }
          })
        })
        return selectFoods
      },
      currentIndex() {
        //依赖于右侧列表的滑动位置
        let index = this.tops.findIndex((top, index) => {  //判断滑动的距离在li高度组成的数组中的位置
          return this.scrollY > top && this.scrollY < this.tops[index + 1]
        })

        //左侧列表置顶
        if (index !== this.oldIndex) {
          this.oldIndex = index
          let liNode = this.$refs.menuList.children[index]
          this.menuScroll.scrollToElement(liNode, 300)
        }
        return index
      }
    },
    async mounted() {
      const res = await this.$http.goods.getGoods()
      const {errno, body} = res
      if (errno === OK) {
        this.goods = body
      }

      this._initScroll()
      this.$nextTick(() => {
        this._initTops()
      })

    }
  }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        display flex
        position absolute
        left 0
        right 0
        top 174px
        bottom 48px
        overflow hidden

        .menuWrap
            flex 0 0 80px

            .menuList
                .menuItem
                    one-px(rgba(7, 17, 27, 0.2))
                    background-color #f3f5f7
                    display flex
                    justify-content center
                    align-items center
                    width 100%
                    height 54px
                    /*padding 0 12px*/

                    &::after
                        width 56px

                    &.active
                        background yellowgreen

                    .icon
                        margin-right 2px

                    .text
                        font-size 12px
                        font-weight 200
                        line-height 14px
                        color rgba(7, 17, 27, 1)

        .foodsWrap
            flex 1

            .foodsList
                .foodsItem
                    h2
                        height 28px
                        font-size 12px
                        color rgba(147, 153, 159, 1)
                        line-height 28px
                        background-color #f3f5f7
                        border-left 2px solid #d9dde1
                        padding-left 14px

                    .foodList
                        .foodItem
                            display flex
                            padding 18px
                            one-px(rgba(7, 17, 27, 0.2))

                            &::after
                                width 86%

                            &:last-child
                                border-none()

                            .left
                                flex 0 0 80px
                                margin-right 10px

                                img
                                    width 100%
                                    height 70px

                            .right
                                flex 1
                                position relative

                                .name
                                    font-size 14px
                                    color rgba(7, 17, 27, 1)
                                    line-height 14px
                                    font-weight 700
                                    margin-top 2px
                                    margin-bottom 8px

                                .description
                                    font-size 10px
                                    color rgba(147, 153, 159, 1)
                                    line-height 10px
                                    margin-bottom 8px

                                .count
                                    font-size 10px
                                    color rgba(147, 153, 159, 1)
                                    line-height 10px
                                    margin-bottom 8px

                                    .sellCount
                                        margin-right 12px

                                .prices
                                    .nowPrice
                                        font-size 12px
                                        color rgb(240, 20, 20)
                                        line-height 14px
                                        font-weight 700
                                        margin-right 8px

                                    .oldPrice
                                        font-size 10px
                                        color rgb(147, 153, 159)
                                        line-height 14px
                                        font-weight 200
                                        text-decoration line-through

                                .addAndDec
                                    position absolute
                                    right 0
                                    bottom -5px

</style>
