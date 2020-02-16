import goods from "@/pages/ele-goods/goods.vue"
import ratings from "@/pages/ratings.vue"
import sellers from "@/pages/Sellers.vue"

export default [
  {path:"/goods",component:goods},
  {path:"/Sellers",component:sellers},
  {path:"/ratings",component:ratings},
  {path:"/",redirect:"goods"}

]
