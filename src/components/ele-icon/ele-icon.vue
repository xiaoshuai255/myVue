<template>
    <i class="icon" :class="[`icon-${size}`,`${className[type]}`]"></i>
</template>

<script>
  export default {
    name: "ele-icon",
    props:{
      type:Number,
      size:Number
    },
    data(){
      return {
        className:["discount","decrease","guarantee","invoice","special"]
      }
    }
  }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .icon
        background-size 100% 100%
        background-repeat no-repeat
        display inline-block
        &.icon-1
            width 12px
            height 12px
            &.decrease
                bg-image(decrease_1)

            &.discount
                bg-image(discount_1)

            &.guarantee
                bg-image(guarantee_1)

            &.invoice
                bg-image(invoice_1)

            &.special
                bg-image(special_1)

        &.icon-2
            width 16px
            height 16px
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

        &.icon-3
            width 12px
            height 12px
            &.decrease
                bg-image(decrease_3)

            &.discount
                bg-image(discount_3)

            &.guarantee
                bg-image(guarantee_3)

            &.invoice
                bg-image(invoice_3)

            &.special
                bg-image(special_3)


        &.icon-4
            width 16px
            height 16px
            &.decrease
                bg-image(decrease_4)

            &.discount
                bg-image(discount_4)

            &.guarantee
                bg-image(guarantee_4)

            &.invoice
                bg-image(invoice_4)

            &.special
                bg-image(special_4)

</style>
