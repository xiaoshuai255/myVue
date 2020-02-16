<template>
    <ul class="list">
        <li class="item" v-for="support in supports">
            <i class="icon" :class="className[support.type]"></i>
            <span class="text">{{support.content}}</span>
        </li>

    </ul>
</template>

<script>
  export default {
    name: "ele-list",
    props:{
      supports:Array
    },
    data() {
      return {
        className: ["discount", "decrease", "guarantee", "invoice", "special"]  //将几种折扣的名字放进数组用于选中
      }
    }
  }
</script>

<style scoped lang="stylus">
    @import "../../../common/stylus/mixin.styl"
    .list
        box-sizing border-box
        width 80%
        text-align left
        margin 0 auto
        margin-top 24px
        margin-bottom 28px
        padding 0 12px

        .item
            font-size 12px
            line-height 12px
            color rgba(255, 255, 255, 1)
            margin-bottom 12px

            &:last-child
                margin-bottom 0

            .icon
                background-size 100% 100%
                background-repeat no-repeat
                display inline-block
                width 16px
                height 16px
                margin-right 6px
                vertical-align middle

                &.decrease
                    bg-image(decrease_2)

                &.discount
                    bg-image(discount_2)

                &.guarantee
                    bg-image(guarantee_2)

                &.invoice
                    bg-image(invoice_2)

                &.special
                    bg-image(special_2)

</style>
